import { createTRPCRouter, publicProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
  getStats: publicProcedure.query(async ({ ctx }) => {
    const questionCount = await ctx.prisma.question.count({
      where: {
        draft: false,
      },
    });
    const answerCount = await ctx.prisma.answer.count({});
    const userCount = await ctx.prisma.user.count({});
    return {
      users: userCount,
      answers: answerCount,
      questions: questionCount,
    };
  }),
  getTops: publicProcedure.query(async ({ ctx }) => {
    const questions = await ctx.prisma.question.findMany({
      take: 3,
      where: {
        draft: false,
      },
      orderBy: {
        views: "desc",
      },
      include: {
        user: true,
        tags: true,
      },
    });
    const users = await ctx.prisma.user.findMany({
      take: 3,
      orderBy: {
        answers: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            questions: true,
            answers: true,
          },
        },
      },
    });
    return {
      users,
      questions,
    };
  }),
});
