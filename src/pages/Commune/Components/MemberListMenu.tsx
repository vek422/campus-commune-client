import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserMinus } from "lucide-react";

import ChangeRoleDialog from "./ChangeRoleDialog";

export default function MemberActions({
  user,
}: {
  user: { firstName: string; lastName: string; role: string; _id: string };
}) {
  return (
    <div className="flex items-center">
      <ChangeRoleDialog user={user} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="h-7 w-7 rounded-full border border-transparent hover:border-destructive hover:text-destructive hover:bg-transparent "
            >
              <UserMinus size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-destructive">
            <p className="text-destructive-foreground">Remove Member</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
