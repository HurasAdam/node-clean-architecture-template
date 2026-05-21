import { z } from "zod";

export const nameFieldSchema = z
  .string()
  .min(2, { message: "Conversation title must be at least 2 characters long" })
  .max(40, {
    message: "Conversation title must be at most 40 characters long",
  });

export const createProductTopicDto = z.object({
  name: nameFieldSchema,
  product: z.string(),
});

export type CreateProductTopicDto = z.infer<typeof createProductTopicDto>;
