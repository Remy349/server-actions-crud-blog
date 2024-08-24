export interface PostDTO {
  id: string;
  title: string;
  content: string | null;
  isPublished: boolean;
  createdAt: Date;
}
