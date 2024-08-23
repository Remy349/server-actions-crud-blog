import { Post } from "../domain/entities/Post";
import { IPostRepository } from "../domain/IPostRepository";

export class GetPostByIdUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(postId: string): Promise<Post | null> {
    const post = await this.postRepository.getById(postId);

    if (!post) {
      return null;
    }

    return post;
  }
}
