import { z } from "zod";

export const CreateFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export type TCreateFormSchema = z.infer<typeof CreateFormSchema>;
