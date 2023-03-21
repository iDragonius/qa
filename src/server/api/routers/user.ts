import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const userRouter = createTRPCRouter({
  chooseNickname: protectedProcedure
    .input(z.object({ nickname: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const checkNickname = await ctx.prisma.user.findUnique({
        where: {
          nickname: input.nickname,
        },
      });
      if (checkNickname) {
        throw new TRPCError({
          message: "Nickname unique constraint failed",
          code: "BAD_REQUEST",
        });
      }
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          nickname: input.nickname,
        },
      });
    }),
});
