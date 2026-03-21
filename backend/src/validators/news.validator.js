import { z } from "zod";

export const headlinesQuerySchema = z.object({
  country: z.string().length(2).optional()
});

export const searchQuerySchema = z.object({
  q: z.string().min(1)
});

export const categoryParamSchema = z.object({
  params: z.object({
    category: z.enum([
      "technology",
      "business",
      "sports",
      "science",
      "health",
      "entertainment",
      "politics"
    ])
  })
});