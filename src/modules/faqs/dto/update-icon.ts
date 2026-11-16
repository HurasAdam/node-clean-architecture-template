/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateFaqIconDto = z.object({
  iconKey: z.string().trim().min(1),
});

export type UpdateFaqIconDto = z.infer<typeof updateFaqIconDto>;
