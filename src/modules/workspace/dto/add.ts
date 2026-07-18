/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const addWorkspaceDto = z.object({
  name: z.string().min(2).max(25),
  description: z.string().max(200).optional(),
  icon: z.string(),
  labelColor: z.string(),
});

export type AddWorkspaceDto = z.infer<typeof addWorkspaceDto>;
