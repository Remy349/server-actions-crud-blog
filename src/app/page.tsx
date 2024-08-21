import { getAllPosts } from "@/services/PostService";
import { EmptyState } from "./_components/empty-state";
import { CreateDialog } from "./_components/create-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const posts = await getAllPosts();

  return (
    <div>
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          <div className="mb-6">
            <CreateDialog />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <CardDescription>
                    Created: {formatDate(post.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <Badge variant="secondary">
                      {post.isPublished ? "Published" : "Not published"}
                    </Badge>
                  </div>
                  {post.content === "" ? (
                    <p className="text-sm line-clamp-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ex quod ipsum illo impedit odit necessitatibus excepturi
                      similique laudantium expedita possimus!
                    </p>
                  ) : (
                    <p className="text-sm line-clamp-4">{post.content}</p>
                  )}
                </CardContent>
                <CardFooter className="gap-x-3">
                  <Button
                    className="font-medium flex-1"
                    variant="outline"
                    asChild
                  >
                    <Link href={`/posts/${post.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button className="font-medium flex-1" asChild>
                    <Link href={`/posts/${post.id}/edit`}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
