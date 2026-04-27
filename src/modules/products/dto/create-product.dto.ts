/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const createProductDto = z.object({
  name: z.string().trim().min(2).max(50),
  labelColor: z.string(),
});

export type CreateProductDto = z.infer<typeof createProductDto>;
