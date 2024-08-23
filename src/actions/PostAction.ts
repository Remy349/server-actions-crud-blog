"use server";

import { CreatePostUseCase } from "@/modules/post/application/CreatePostUseCase";
import { DeletePostUseCase } from "@/modules/post/application/DeletePostUseCase";
import { UpdatePostIsPublishedUseCase } from "@/modules/post/application/UpdatePostIsPublishedUseCase";
import { PostRepositoryImpl } from "@/modules/post/infrastructure/repository/PrismaPostRepository";
import { TCreateFormSchema } from "@/schemas/PostSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const postRepository = new PostRepositoryImpl();

const createPostUseCase = new CreatePostUseCase(postRepository);
const deletePostUseCase = new DeletePostUseCase(postRepository);
const updatePostIsPublishedUseCase = new UpdatePostIsPublishedUseCase(
  postRepository,
);

export const createPostAction = async (
  formData: TCreateFormSchema,
): Promise<void> => {
  const post = await createPostUseCase.execute(formData);

  revalidatePath("/");
  redirect(`/posts/${post.id}/edit`);
};

export const updatePostIsPublishedAction = async (
  postId: string,
  isPublished: boolean,
): Promise<void> => {
  await updatePostIsPublishedUseCase.execute(postId, isPublished);

  revalidatePath(`/posts/${postId}/edit`);
};

export const deletePostAction = async (postId: string): Promise<void> => {
  await deletePostUseCase.execute(postId);

  revalidatePath("/");
  redirect("/");
};
