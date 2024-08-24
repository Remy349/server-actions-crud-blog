import { UpdatePostDTO } from "../domain/dtos/UpdatePostDTO";
import { IPostRepository } from "../domain/IPostRepository";

export class UpdatePostUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(postId: string, data: UpdatePostDTO): Promise<void> {
    return await this.postRepository.update(postId, data);
  }
}
