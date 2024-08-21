import { getPostById } from "@/services/PostService";

interface IParams {
  params: { postId: string };
}

export default async function Page({ params }: IParams) {
  const { postId } = params;

  const post = await getPostById(postId);

  console.log(post);

  return <h1>{post?.title}</h1>;
}
