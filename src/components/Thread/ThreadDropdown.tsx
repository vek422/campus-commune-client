import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/store/store";
import { useDeleteThread } from "@/hooks/api/useDeleteThread";

export default function ThreadDropdown({
  channelId,
  communeId,
  createdBy,
  threadId,
}: {
  channelId: string;
  threadId: string;
  communeId: string;
  createdBy: { _id: string };
}) {
  const { deleteThread } = useDeleteThread({
    channelId: channelId,
    communeId: communeId,
  });
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const user = useAppSelector((state) => state.auth.user);
  const canDeleteThread =
    createdBy?._id === user?._id ||
    (commune?.roles && commune?.roles[user?._id as string]?.name === "admin");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <EllipsisVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {canDeleteThread && (
            <DropdownMenuItem
              className="cursor-pointer w-full text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={() => deleteThread(threadId)}
            >
              Delete Thread
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
