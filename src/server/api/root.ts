import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { questionRouter } from "./routers/question";
import { userRouter } from "./routers/user";
import { tagsRouter } from "./routers/tags";
import { answerRouter } from "./routers/answer";

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
});

// export type definition of API
export type AppRouter = typeof appRouter;
