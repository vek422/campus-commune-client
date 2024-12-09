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
import { Link } from "react-router-dom";

export default function CommuneMenu({ communeId }: { communeId: string }) {
  const { leaveCommune } = useJoinCommune(communeId);
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = commune?.roles[user?._id as string]?.name === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <EllipsisVertical size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuGroup className="">
          {isAdmin && (
            <DropdownMenuItem>
              <Link to={`/commune/${communeId}/manage`}>Manage</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="cursor-pointer w-full text-destructive focus:bg-destructive focus:text-destructive-foreground"
            onClick={() => leaveCommune(user?._id as string)}
          >
            Leave Commune
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
