/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateWorkspaceFolderDto = z.object({
  name: z.string().min(2).max(25),
  description: z.string().min(2).max(150).optional(),
});

export type UpdateWorkspaceFolderDto = z.infer<typeof updateWorkspaceFolderDto>;
