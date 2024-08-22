import { IPostRepository } from "../domain/IPostRepository";

export class DeletePostUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(postId: string): Promise<void> {
    return await this.postRepository.delete(postId);
  }
}
