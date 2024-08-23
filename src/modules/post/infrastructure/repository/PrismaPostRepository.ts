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
      throw new Error("Failed to fetch posts");
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
      throw new Error("Failed to fetch post");
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
      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Internal server error");
    }
  }

  async updateIsPublished(postId: string, isPublished: boolean): Promise<void> {
    try {
      const postRegistered = await this.getById(postId);

      if (!postRegistered) {
        throw new Error("Post not found");
      }

      await this.db.post.update({
        where: { id: postRegistered.id },
        data: { isPublished },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Internal server error");
    }
  }

  async delete(postId: string): Promise<void> {
    try {
      const postRegistered = await this.getById(postId);

      if (!postRegistered) {
        throw new Error("Post not found");
      }

      await this.db.post.delete({
        where: { id: postRegistered.id },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Internal server error");
    }
  }
}
