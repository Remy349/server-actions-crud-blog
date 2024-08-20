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

  async getById(postId: string): Promise<Post | null> {
    try {
      const post = await this.db.post.findFirst({
        where: { id: postId },
      });

      if (!post) {
        return null;
      }

      return new Post(
        post.id,
        post.title,
        post.content,
        post.isPublished,
        post.createdAt,
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
        data: {
          id: post.id,
          title: post.title,
          content: post.content,
          isPublished: post.isPublished,
          createdAt: post.createdAt,
        },
      });

      return post;
    } catch (err) {
      console.error(err);
      throw new Error("Internal server error");
    }
  }
}
