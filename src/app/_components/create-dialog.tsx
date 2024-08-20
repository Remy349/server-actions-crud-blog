import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateForm } from "./create-form";

export const CreateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-medium">Create new post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
          <DialogDescription>
            Here you can create a new post. Click on save when you are done.
          </DialogDescription>
        </DialogHeader>
        <CreateForm />
      </DialogContent>
    </Dialog>
  );
};
