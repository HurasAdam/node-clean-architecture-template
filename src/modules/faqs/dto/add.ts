import { z } from "zod";

export const addFaqDto = z.object({
  title: z.string().trim().min(3).max(255),
  description: z.string().trim().min(3).max(255),
  iconKey: z.string(),
  questions: z
    .array(
      z.object({
        question: z.string().trim(),
        answer: z.string().trim(),
      }),
    )
    .nonempty(),
});
export type AddFaqDto = z.infer<typeof addFaqDto>;
