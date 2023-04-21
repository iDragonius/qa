import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const answerRouter = createTRPCRouter({
  sendAnswer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.answer.create({
        data: {
          content: input.content,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          question: {
            connect: {
              id: input.id,
            },
          },
        },
      });
    }),
  deleteAnswer: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        answerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findUnique({
        where: {
          id: input.questionId,
        },
        include: {
          answers: {
            include: {
              user: true,
            },
          },
          tags: true,
        },
      });
      if (!question)
        throw new TRPCError({
          message: "unexisted question",
          code: "BAD_REQUEST",
        });
      const findAnswer = question.answers.find(
        (answer) => answer.id === input.answerId
      );

      if (!findAnswer)
        throw new TRPCError({
          message: "unexisted answer",
          code: "BAD_REQUEST",
        });

      if (findAnswer.user.id !== ctx.session.user.id)
        throw new TRPCError({
          message: "You cant interrupt with this answer",
          code: "BAD_REQUEST",
        });
      if (findAnswer.is_answer) {
        if (question.answers.filter((a) => a.is_answer).length === 1) {
          await ctx.prisma.question.update({
            where: {
              id: input.questionId,
            },
            data: {
              is_answered: false,
            },
          });
        }
      }
      await ctx.prisma.answer.delete({
        where: {
          id: findAnswer.id,
        },
      });
      return {
        status: 1,
      };
    }),
});
