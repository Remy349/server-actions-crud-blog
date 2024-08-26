import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center mb-2 md:text-3xl">
        Resource not found - 404
      </h1>
      <p className="text-muted-foreground text-center mb-6 text-sm">
        The resource you are trying to access has not been found on our server.
      </p>
      <div className="flex justify-center">
        <Button className="font-medium" asChild>
          <Link href="/">Go back to posts</Link>
        </Button>
      </div>
    </div>
  );
}
