import { z } from "zod";

export const addContactRecordDto = z.object({
  topicId: z.string().min(1, {
    message: "Topic ID is required",
  }),

  type: z.enum(["phone", "message"], {
    message: "Contact type must be either phone or message",
  }),

  note: z
    .string()
    .trim()
    .max(1000, {
      message: "Note must be at most 1000 characters long",
    })
    .optional(),
});

export type AddContactRecordDto = z.infer<typeof addContactRecordDto>;
