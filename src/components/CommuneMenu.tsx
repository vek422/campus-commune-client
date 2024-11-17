import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { useJoinCommune } from "@/hooks/api/useJoinCommune";
import { useAppSelector } from "@/store/store";

export default function CommuneMenu({ communeId }: { communeId: string }) {
  const { leaveCommune, isLoading, success } = useJoinCommune(communeId);
  const { user } = useAppSelector((state) => state.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <EllipsisVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuGroup className="">
          <DropdownMenuItem
            className="cursor-pointer w-full text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => leaveCommune(user?._id)}
          >
            Leave Commune
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
