import { Post } from "../domain/entities/Post";
import { IPostRepository } from "../domain/IPostRepository";
import { CreatePostDTO } from "../domain/dtos/CreatePostDTO";

export class CreatePostUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(data: CreatePostDTO): Promise<Post> {
    return await this.postRepository.create(data);
  }
}
