import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="font-medium" disabled={pending}>
      {pending ? (
        <LoaderCircle className="w-5 h-5 animate-spin" />
      ) : (
        <p>Save</p>
      )}
    </Button>
  );
};
