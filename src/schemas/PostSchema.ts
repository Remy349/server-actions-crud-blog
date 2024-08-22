import { z } from "zod";

export const CreateFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export type TCreateFormSchema = z.infer<typeof CreateFormSchema>;

export const EditFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export type TEditFormSchema = z.infer<typeof EditFormSchema>;
