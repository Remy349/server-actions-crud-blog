import { getPostById } from "@/services/PostService";

interface IParams {
  params: { postId: string };
}

export default async function Page({ params }: IParams) {
  const { postId } = params;

  const post = await getPostById(postId);

  if (!post) {
    return <h1>Not found</h1>;
  }

  return <h1>{post.title}</h1>;
}
