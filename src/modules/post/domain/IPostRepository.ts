import { Post } from "./entities/Post";

export interface IPostRepository {
  getAll(): Promise<Post[]>;
  getById(postId: string): Promise<Post | null>;
  create(post: Post): Promise<Post>;
}
