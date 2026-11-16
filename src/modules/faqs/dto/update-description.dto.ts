/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";
export const updateFaqDescriptionDto = z.object({
  description: z.string().trim().min(1).max(5000),
});

export type UpdateFaqDescriptionDto = z.infer<typeof updateFaqDescriptionDto>;
