import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "../../domain/IPostRepository";
import PrismaSingleton from "@/db/prisma";
import { Post } from "../../domain/entities/Post";
import { UpdatePostDTO } from "../../domain/dtos/UpdatePostDTO";
import { CreatePostDTO } from "../../domain/dtos/CreatePostDTO";

export class PostRepositoryImpl implements IPostRepository {
  private db: PrismaClient;

  constructor() {
    this.db = PrismaSingleton.getInstance();
  }

  async getAll(): Promise<Post[]> {
    try {
      return await this.db.post.findMany();
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

      return post;
    } catch (err) {
      throw new Error("Failed to fetch post");
    }
  }

  async create(data: CreatePostDTO): Promise<Post> {
    try {
      const postRegistered = await this.db.post.findFirst({
        where: { title: data.title },
      });

      if (postRegistered) {
        throw new Error("Post already registered");
      }

      const post = new Post(data.title);

      await this.db.post.create({
        data: post,
      });

      return post;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Internal server error");
    }
  }

  async update(postId: string, data: UpdatePostDTO): Promise<void> {
    try {
      const postRegistered = await this.getById(postId);

      if (!postRegistered) {
        throw new Error("Post not found");
      }

      if (postRegistered.title !== data.title) {
        const isAlreadyRegistered = await this.db.post.findFirst({
          where: { title: data.title },
        });

        if (isAlreadyRegistered) {
          throw new Error("Post already registered");
        }
      }

      await this.db.post.update({
        where: { id: postRegistered.id },
        data: {
          title: data.title,
          content: data.content,
        },
      });
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
