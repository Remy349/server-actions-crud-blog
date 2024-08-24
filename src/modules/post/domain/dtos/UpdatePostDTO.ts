import { PostDTO } from "./PostDTO";

export type UpdatePostDTO = Pick<PostDTO, "title" | "content">;
