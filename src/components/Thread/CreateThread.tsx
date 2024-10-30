import { useState } from "react";
import { CreateThreadForm } from "@/forms/createThread";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

export const CreateThread = ({ setThreads }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Thread</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <>
          <DialogHeader className="text-xl font-bold font-body">
            Create New Thread
          </DialogHeader>
          <div className="w-full">
            <CreateThreadForm
              closeDialog={closeDialog}
              setThreads={setThreads}
            />
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};
