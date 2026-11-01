/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateProductAndCategoryDto = z.object({
  product: z.string(),
  category: z.string(),
});

export type UpdateProductAndCategoryDto = z.infer<
  typeof updateProductAndCategoryDto
>;
