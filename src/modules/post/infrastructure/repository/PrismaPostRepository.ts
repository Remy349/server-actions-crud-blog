import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "../../domain/IPostRepository";
import PrismaSingleton from "@/db/prisma";
import { Post } from "../../domain/entities/Post";

export class PostRepositoryImpl implements IPostRepository {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  async getAll(): Promise<Post[]> {
    const posts = await this.db.post.findMany();

    return posts.map(
      (post) =>
        new Post(
          post.id,
          post.title,
          post.content,
          post.isPublished,
          post.createdAt,
        ),
    );
  }
}
