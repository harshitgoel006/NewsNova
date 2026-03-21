import { z } from "zod";

export const bookmarkSchema = z.object({
  body: z.object({
    articleId: z.string().min(1, "Article ID required"),

    title: z
      .string()
      .min(3, "Title too short")
      .max(300, "Title too long"),

    url: z
      .string()
      .url("Invalid URL"),

    source: z
      .string()
      .min(2, "Source required"),

    image: z
      .string()
      .url("Invalid image URL")
      .optional(),

    publishedAt: z
      .string()
      .datetime()
      .optional()
  })
});