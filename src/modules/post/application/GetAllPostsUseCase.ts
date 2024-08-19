import { Post } from "../domain/entities/Post";
import { IPostRepository } from "../domain/IPostRepository";

export class GetAllPostsUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(): Promise<Post[]> {
    return await this.postRepository.getAll();
  }
}
