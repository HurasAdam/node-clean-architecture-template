/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateArticleTitleDto = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Tytuł artykułu jest wymagany")
    .max(200, "Tytuł może mieć maksymalnie 200 znaków"),
});

export type UpdateArticleTitleDto = z.infer<typeof updateArticleTitleDto>;
