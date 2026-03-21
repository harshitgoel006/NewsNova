import { z } from "zod";

export const historySchema = z.object({
  body: z.object({
    articleId: z.string().min(1),

    title: z
      .string()
      .min(3)
      .max(300),

    image: z
      .string()
      .url()
      .optional(),

    url: z
      .string()
      .url(),

    source: z
      .string()
      .min(2)
      .optional()
  })
});