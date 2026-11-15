import { z } from "zod";

export const faqStatus = z.enum(["PUBLIC", "UNPUBLIC"]);

export const addFaqDto = z.object({
  title: z.string().trim().min(3).max(255),
  description: z.string().trim().min(3).max(255),
  iconKey: z.string(),
  status: faqStatus.default("UNPUBLIC"),
});
export type AddFaqDto = z.infer<typeof addFaqDto>;
