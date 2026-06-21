/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const createArticleDto = z.object({
  title: z.string().trim().min(3).max(255),
  internalNote: z.string().trim().min(1).max(9000),
  // tags: z.array(z.string().refine(Types.ObjectId.isValid)).nonempty(),
  product: z.string(),
  category: z.string(),

  responseTemplates: z
    .array(
      z.object({
        version: z.number(),
        variantName: z.string().optional(),
        variantContent: z.string().min(1),
      }),
    )
    .nonempty(),
});
export type CreateArticleDto = z.infer<typeof createArticleDto>;
