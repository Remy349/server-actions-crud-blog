"use client";

import { createPostAction } from "@/actions/PostAction";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { Label } from "@/components/ui/label";

export const CreateForm = () => {
  return (
    <form className="grid gap-y-4" action={createPostAction}>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="title" className="font-medium">
          Title
        </Label>
        <Input type="text" name="title" id="title" />
      </div>
      <SubmitButton />
    </form>
  );
};
