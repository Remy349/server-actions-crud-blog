import { GetAllPostsUseCase } from "@/modules/post/application/GetAllPostsUseCase";
import { PostRepositoryImpl } from "@/modules/post/infrastructure/repository/PrismaPostRepository";

const postRepository = new PostRepositoryImpl();

const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);

export const getAllPosts = async () => {
  return await getAllPostsUseCase.execute();
};
