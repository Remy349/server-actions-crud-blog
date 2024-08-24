import { v4 as uuid } from "uuid";

export class Post {
  id: string;
  title: string;
  content: string | null;
  isPublished: boolean;
  createdAt: Date;

  constructor(title: string) {
    this.id = uuid();
    this.title = title;
    this.content = "";
    this.isPublished = false;
    this.createdAt = new Date();
  }
}
