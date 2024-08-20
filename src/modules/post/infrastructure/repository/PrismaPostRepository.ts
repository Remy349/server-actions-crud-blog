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
    try {
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
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error");
    }
  }

  async create(post: Post): Promise<Post> {
    try {
      const postRegistered = await this.db.post.findFirst({
        where: { title: post.title },
      });

      if (postRegistered) {
        throw new Error("Post already registered");
      }

      await this.db.post.create({
        data: post,
      });

      return post;
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error");
    }
  }
}
