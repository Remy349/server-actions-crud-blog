"use server";

import { CreatePostUseCase } from "@/modules/post/application/CreatePostUseCase";
import { DeletePostUseCase } from "@/modules/post/application/DeletePostUseCase";
import { PostRepositoryImpl } from "@/modules/post/infrastructure/repository/PrismaPostRepository";
import { TCreateFormSchema } from "@/schemas/PostSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const postRepository = new PostRepositoryImpl();

const createPostUseCase = new CreatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);

export const createPostAction = async (
  formData: TCreateFormSchema,
): Promise<void> => {
  const post = await createPostUseCase.execute(formData);

  revalidatePath("/");
  redirect(`/posts/${post.id}/edit`);
};

export const deletePostAction = async (postId: string): Promise<void> => {
  await deletePostUseCase.execute(postId);

  revalidatePath("/");
  redirect("/");
};
