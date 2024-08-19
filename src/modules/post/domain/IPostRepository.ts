import { Post } from "./entities/Post";

export interface IPostRepository {
  getAll(): Promise<Post[]>;
}
