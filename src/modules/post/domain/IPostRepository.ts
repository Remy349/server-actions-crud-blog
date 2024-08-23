import { Post } from "./entities/Post";

export interface IPostRepository {
  getAll(): Promise<Post[]>;
  getById(postId: string): Promise<Post | null>;
  create(post: Post): Promise<Post>;
  updateIsPublished(postId: string, isPublished: boolean): Promise<void>;
  delete(postId: string): Promise<void>;
}
