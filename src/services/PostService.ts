import { GetAllPostsUseCase } from "@/modules/post/application/GetAllPostsUseCase";
import { GetPostByIdUseCase } from "@/modules/post/application/GetPostByIdUseCase";
import { PostRepositoryImpl } from "@/modules/post/infrastructure/repository/PrismaPostRepository";

const postRepository = new PostRepositoryImpl();

const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);
const getPostByIdUseCase = new GetPostByIdUseCase(postRepository);

export const getAllPosts = async () => {
  return await getAllPostsUseCase.execute();
};

export const getPostById = async (postId: string) => {
  return await getPostByIdUseCase.execute(postId);
};
