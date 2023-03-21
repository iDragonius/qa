import { z } from "zod";
export const questionCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  draft: z.boolean(),
});

export const questionPublishSchema = z.object({
  id: z.string(),
  draft: z.boolean(),
});
