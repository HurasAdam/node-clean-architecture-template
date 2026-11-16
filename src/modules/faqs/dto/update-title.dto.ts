/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

import { z } from "zod";

export const updateFaqTitleDto = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Tytuł sekcji FAQ jest wymagany")
    .max(200, "Tytuł sekcji może mieć maksymalnie 120 znaków"),
});

export type UpdateFaqTitleDto = z.infer<typeof updateFaqTitleDto>;
