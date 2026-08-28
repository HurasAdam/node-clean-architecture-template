/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateWorkspaceArticleDto = z.object({
  title: z.string().trim().min(2).max(100).optional(),

  folderId: z.string().min(1).optional(),

  label: z.enum(["important", "popular"]).nullable().optional(),
});

export type UpdateWorkspaceArticleDto = z.infer<
  typeof updateWorkspaceArticleDto
>;
