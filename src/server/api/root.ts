import { createTRPCRouter } from "~/server/api/trpc";
import { questionRouter } from "./routers/question";
import { userRouter } from "./routers/user";
import { tagsRouter } from "./routers/tags";
import { answerRouter } from "./routers/answer";
import { dashboardRouter } from "./routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  question: questionRouter,
  user: userRouter,
  tags: tagsRouter,
  answer: answerRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
