import { z } from "zod";

export const addFaqItemDto = z.object({
  faqId: z.string(),
  question: z.string().trim().min(3).max(500),
  answer: z.string().trim().min(3),
});

export type AddFaqItemDto = z.infer<typeof addFaqItemDto>;
