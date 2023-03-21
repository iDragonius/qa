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
});
