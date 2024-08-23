"use client";

import { updatePostIsPublishedAction } from "@/actions/PostAction";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface IToggleIsPublishedProps {
  postId: string;
  isPublished: boolean;
}

export const ToggleIsPublished = ({
  postId,
  isPublished,
}: IToggleIsPublishedProps) => {
  const handleToggleIsPublished = async () => {
    await updatePostIsPublishedAction(postId, !isPublished);

    toast.success("Post successfully updated");
  };

  return (
    <Button size="icon" variant="outline" onClick={handleToggleIsPublished}>
      {isPublished ? (
        <Eye className="w-4 h-4" />
      ) : (
        <EyeOff className="w-4 h-4" />
      )}
    </Button>
  );
};
