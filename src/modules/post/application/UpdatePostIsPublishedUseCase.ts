import { IPostRepository } from "../domain/IPostRepository";

export class UpdatePostIsPublishedUseCase {
  private postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async execute(postId: string, isPublished: boolean): Promise<void> {
    return await this.postRepository.updateIsPublished(postId, isPublished);
  }
}
