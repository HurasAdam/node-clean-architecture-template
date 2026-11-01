/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";
export const updateInternalNoteDto = z.object({
  internalNote: z.string().trim().min(1).max(9000),
});

export type UpdateInternalNoteDto = z.infer<typeof updateInternalNoteDto>;
