import { Post } from "./entities/Post";
import { UpdatePostDTO } from "./dtos/UpdatePostDTO";
import { CreatePostDTO } from "./dtos/CreatePostDTO";

export interface IPostRepository {
  getAll(): Promise<Post[]>;
  getById(postId: string): Promise<Post | null>;
  create(data: CreatePostDTO): Promise<Post>;
  update(postId: string, data: UpdatePostDTO): Promise<void>;
  updateIsPublished(postId: string, isPublished: boolean): Promise<void>;
  delete(postId: string): Promise<void>;
}
