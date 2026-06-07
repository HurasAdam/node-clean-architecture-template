import { z } from "zod";

export const updateUserDto = z.object({
  name: z.string().trim().min(1, "Imię jest wymagane"),

  surname: z.string().trim().min(1, "Nazwisko jest wymagane"),
});

export type UpdateUserDto = z.infer<typeof updateUserDto>;
