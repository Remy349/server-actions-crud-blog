import { getAllPosts } from "@/services/PostService";
import { EmptyState } from "./_components/empty-state";

export default async function Page() {
  const posts = await getAllPosts();

  console.log(posts);

  return (
    <div>
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          <h1>CONTENT</h1>
        </div>
      )}
    </div>
  );
}
