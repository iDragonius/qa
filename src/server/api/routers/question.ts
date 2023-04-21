import {
  questionCreateSchema,
  questionPublishSchema,
} from "../schemas/question";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const questionRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(questionCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.question.create({
        data: {
          title: input.title,
          content: input.content,
          draft: input.draft,
          user: {
            connect: {
              id: ctx.session?.user.id,
            },
          },
        },
      });
    }),
  publishQuestion: protectedProcedure
    .input(questionPublishSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.question.update({
        where: {
          id: input.id,
        },
        data: {
          draft: input.draft,
          title: input.title,
          content: input.content,
        },
      });
    }),
  getAllQuestions: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.question.findMany({
      where: {
        draft: false,
      },
      include: {
        user: true,
        tags: true,
      },
    });
  }),
  getQuestion: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.question.update({
        where: {
          id: input.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
        include: {
          user: true,
          answers: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
          tags: true,
        },
      });
    }),
  getUserDrafts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.question.findMany({
      where: {
        user: {
          id: ctx.session.user.id,
        },
        draft: true,
      },
    });
  }),
  getUserQuestions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.question.findMany({
      where: {
        user: {
          id: ctx.session.user.id,
        },
        draft: false,
      },
      include: {
        user: true,
        tags: true,
      },
    });
  }),
  getUserDraft: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const draft = await ctx.prisma.question.findUnique({
        where: {
          id: input,
        },
        include: {
          user: true,
          tags: true,
        },
      });

      if (!draft || draft.user.id !== ctx.session.user.id)
        throw new TRPCError({ message: "redirect", code: "BAD_REQUEST" });

      return draft;
    }),
  getUserQuestion: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.question.findUnique({
        where: {
          id: input,
        },
      });
    }),
  markAnswer: protectedProcedure
    .input(
      z.object({
        questionsId: z.string(),
        answerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findUnique({
        where: {
          id: input.questionsId,
        },
        include: {
          user: true,
          answers: true,
        },
      });
      if (question?.user.nickname !== ctx.session.user.nickname) {
        throw new TRPCError({
          message: "You cant mark this question",
          code: "BAD_REQUEST",
        });
      }
      return await ctx.prisma.question.update({
        where: {
          id: input.questionsId,
        },
        data: {
          is_answered: true,
          answers: {
            update: {
              where: {
                id: input.answerId,
              },
              data: {
                is_answer: true,
              },
            },
          },
        },
      });
    }),
  unmarkAnswer: protectedProcedure
    .input(
      z.object({
        questionsId: z.string(),
        answerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findUnique({
        where: {
          id: input.questionsId,
        },
        include: {
          user: true,
          answers: true,
        },
      });
      if (question?.user.nickname !== ctx.session.user.nickname) {
        throw new TRPCError({
          message: "You cant mark this question",
          code: "BAD_REQUEST",
        });
      }
      const answerCount = question.answers.filter((answer) => answer.is_answer);
      return await ctx.prisma.question.update({
        where: {
          id: input.questionsId,
        },
        data: {
          is_answered: answerCount.length === 1 ? false : true,
          answers: {
            update: {
              where: {
                id: input.answerId,
              },
              data: {
                is_answer: false,
              },
            },
          },
        },
      });
    }),
});
