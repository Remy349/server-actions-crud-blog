import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getPostById } from "@/services/PostService";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IParams {
  params: { postId: string };
}

export default async function Page({ params }: IParams) {
  const { postId } = params;

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="md:max-w-3xl md:mx-auto">
      <div className="mb-4">
        <Button size="icon" variant="outline" asChild>
          <Link href="/">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 md:text-3xl">{post.title}</h1>
        <p className="text-muted-foreground text-sm">
          Created: {formatDate(post.createdAt)}
        </p>
      </div>
      {post.content === "" ? (
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quod ipsum
          illo impedit odit necessitatibus excepturi similique laudantium
          expedita possimus!
        </p>
      ) : (
        <div
          className="prose-sm prose-ol:list-decimal prose-ul:list-disc md:text-base"
          dangerouslySetInnerHTML={{
            __html: post.content || "",
          }}
        />
      )}
    </div>
  );
}
