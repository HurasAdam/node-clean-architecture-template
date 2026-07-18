/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateWorkspaceDto = z.object({
  name: z.string().min(2).max(25).optional(),
  description: z.string().max(200).optional(),
  icon: z.string().optional(),
  labelColor: z.string().optional(),
});

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceDto>;
