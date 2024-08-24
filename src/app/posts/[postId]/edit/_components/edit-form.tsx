"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostDTO } from "@/modules/post/domain/dtos/PostDTO";
import { EditFormSchema, TEditFormSchema } from "@/schemas/PostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { TiptapEditor } from "./tiptap-editor";
import { updatePost } from "@/actions/PostAction";
import { toast } from "sonner";

interface IEditFormProps {
  post: PostDTO;
}

export const EditForm = ({ post }: IEditFormProps) => {
  const form = useForm<TEditFormSchema>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: { title: post.title, content: post.content || "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (formData: TEditFormSchema) => {
    await updatePost(post.id, formData);

    toast.success("Post successfully updated");
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
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TiptapEditor content={field.value} onChange={field.onChange} />
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
