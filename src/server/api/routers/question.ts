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
      if (!ctx.session) {
        throw new TRPCError({
          message: "Unauthorized user",
          code: "BAD_REQUEST",
        });
      }
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
      if (!ctx.session) {
        throw new TRPCError({
          message: "Unauthorized user",
          code: "BAD_REQUEST",
        });
      }
      return await ctx.prisma.question.update({
        where: {
          id: input.id,
        },
        data: {
          draft: input.draft,
        },
      });
    }),
  getAllQuestions: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.prisma.question.findMany({
      include: {
        user: true,
        answers: {
          include: {
            user: true,
          },
        },
        tags: true,
      },
    });
  }),
  getQuestion: protectedProcedure
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
});
