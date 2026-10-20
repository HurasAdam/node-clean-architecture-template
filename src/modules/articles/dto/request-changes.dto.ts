/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const requestChangesDto = z.object({
  reviewNote: z.string().trim().min(1).max(3000),
});

export type RequestChangesDto = z.infer<typeof requestChangesDto>;
