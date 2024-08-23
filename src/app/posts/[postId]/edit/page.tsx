import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/services/PostService";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { EditForm } from "./_components/edit-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteDialog } from "./_components/delete-dialog";
import { ToggleIsPublished } from "./_components/toggle-ispublished";

interface IParams {
  params: { postId: string };
}

export default async function Page({ params }: IParams) {
  const { postId } = params;

  const post = await getPostById(postId);

  if (!post) {
    return <h1>Not found</h1>;
  }

  const plainPost = {
    id: post.id,
    title: post.title,
    content: post.content,
    isPublished: post.isPublished,
    createdAt: post.createdAt,
  };

  return (
    <div className="md:max-w-3xl md:mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-x-2">
          <Button size="icon" variant="outline" asChild>
            <Link href="/">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <ToggleIsPublished postId={post.id} isPublished={post.isPublished} />
          <DeleteDialog postId={post.id} />
        </div>
        <Badge variant="secondary">
          {post.isPublished ? "Published" : "Not published"}
        </Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit post</CardTitle>
          <CardDescription>
            Here you can edit the information of your post. Click save when you
            are done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditForm post={plainPost} />
        </CardContent>
      </Card>
    </div>
  );
}
