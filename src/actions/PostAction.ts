"use server";

import { CreatePostUseCase } from "@/modules/post/application/CreatePostUseCase";
import { DeletePostUseCase } from "@/modules/post/application/DeletePostUseCase";
import { UpdatePostIsPublishedUseCase } from "@/modules/post/application/UpdatePostIsPublishedUseCase";
import { UpdatePostUseCase } from "@/modules/post/application/UpdatePostUseCase";
import { PostRepositoryImpl } from "@/modules/post/infrastructure/repository/PrismaPostRepository";
import { TCreateFormSchema, TEditFormSchema } from "@/schemas/PostSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const postRepository = new PostRepositoryImpl();

const createPostUseCase = new CreatePostUseCase(postRepository);
const updatePostUseCase = new UpdatePostUseCase(postRepository);
const updatePostIsPublishedUseCase = new UpdatePostIsPublishedUseCase(
  postRepository,
);
const deletePostUseCase = new DeletePostUseCase(postRepository);

export const createPostAction = async (
  formData: TCreateFormSchema,
): Promise<void> => {
  const post = await createPostUseCase.execute(formData);

  revalidatePath("/");
  redirect(`/posts/${post.id}/edit`);
};

export const updatePost = async (
  postId: string,
  formData: TEditFormSchema,
): Promise<void> => {
  await updatePostUseCase.execute(postId, formData);

  revalidatePath("/");
  redirect("/");
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
