import { v4 as uuid } from "uuid";
import { Post } from "../domain/entities/Post";
import { IPostRepository } from "../domain/IPostRepository";

export class CreatePostUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(title: string): Promise<Post> {
    const post = new Post(uuid(), title, "", false, new Date());

    return await this.postRepository.create(post);
  }
}
