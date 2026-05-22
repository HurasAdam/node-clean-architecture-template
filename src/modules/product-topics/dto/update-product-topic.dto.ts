/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";
import { createProductTopicDto } from "./create-product-topic.dto";

export const updateProductTopicDto = createProductTopicDto.partial();

export type UpdateProductTopicDto = z.infer<typeof updateProductTopicDto>;
