"use server";

import { CreatePostUseCase } from "@/modules/post/application/CreatePostUseCase";
import { PostRepositoryImpl } from "@/modules/post/infrastructure/repository/PrismaPostRepository";
import { TCreateFormSchema } from "@/schemas/PostSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const postRepository = new PostRepositoryImpl();

const createPostUseCase = new CreatePostUseCase(postRepository);

export const createPostAction = async (
  formData: TCreateFormSchema,
): Promise<void> => {
  const { title } = formData;

  const post = await createPostUseCase.execute(title);

  revalidatePath("/");
  redirect(`/posts/${post.id}/edit`);
};
