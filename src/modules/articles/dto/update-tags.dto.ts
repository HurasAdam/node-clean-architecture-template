/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateArticleTagsDto = z.object({
  tags: z.array(z.string()),
});

export type UpdateArticleTagsDto = z.infer<typeof updateArticleTagsDto>;
