import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loadingButton";
import { useCreateChannel } from "@/hooks/api/useCreateChannel";
import { DialogClose } from "@radix-ui/react-dialog";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CreateChannel() {
  const { communeId = "" } = useParams();
  const { isLoading, createChannel } = useCreateChannel(communeId);
  const [channelName, setChannelName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full w-7 h-7"
          size={"icon"}
          variant={"ghost"}
        >
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-bold">Create New Channel</DialogHeader>
        <Input
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <DialogFooter>
          <LoadingButton
            variant={"default"}
            isLoading={isLoading}
            onClick={() =>
              channelName && createChannel(channelName, () => setIsOpen(false))
            }
          >
            Create
          </LoadingButton>
          <DialogClose>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
