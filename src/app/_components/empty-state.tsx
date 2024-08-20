import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateDialog } from "./create-dialog";

export const EmptyState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts</CardTitle>
        <CardDescription>
          Posts you have created will appear here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[20rem] flex items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-bold tracking-tight">
              You have no posts
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by creating a new post.
            </p>
            <div className="mt-6">
              <CreateDialog />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
