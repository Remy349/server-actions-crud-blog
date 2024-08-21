"use client";

import { createPostAction } from "@/actions/PostAction";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CreateFormSchema, TCreateFormSchema } from "@/schemas/PostSchema";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const CreateForm = () => {
  const form = useForm<TCreateFormSchema>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: { title: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (formData: TCreateFormSchema) => {
    await createPostAction(formData);

    toast.success("Post successfully created");
  };

  return (
    <Form {...form}>
      <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="font-medium">
          {isSubmitting ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            <p>Save</p>
          )}
        </Button>
      </form>
    </Form>
  );
};
