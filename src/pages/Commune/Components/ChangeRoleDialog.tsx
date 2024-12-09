import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAssignRole } from "@/hooks/api/useAssignRole";
import { useAppSelector } from "@/store/store";
import { UserCog } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ChangeRoleDialog({
  user,
}: {
  user: { firstName: string; lastName: string; role: string; _id: string };
}) {
  const { communeId = "" } = useParams();
  const { assignRole } = useAssignRole(communeId);
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState("");

  const allRoles = useAppSelector((state) =>
    state.commune.communes[communeId].allRoles.filter(
      (role) => role.name !== "admin"
    )
  );
  const handleAssignRole = () => {
    if (!roleId) return;
    assignRole({ userId: user._id, roleId, handleClose: () => setOpen(false) });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full"
                onClick={() => setOpen(true)}
              >
                <UserCog size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change Role</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="w-2/5">
        <DialogHeader>
          <p>Change Role</p>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold text-sm">User Info</p>
            <div className="flex gap-2 items-center text-xs text-muted-foreground">
              <p className="">
                Name : {user.firstName} {user.lastName}
              </p>
              <p>
                Current Role :{" "}
                {user.role || <span className="italic">norole</span>}
              </p>
            </div>
          </div>
          <DialogDescription>Choose a role</DialogDescription>
          <Select onValueChange={(value) => setRoleId(value)}>
            <SelectTrigger className="w-2/3">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {allRoles &&
                  allRoles.map((role) => (
                    <SelectItem key={role._id} value={role._id}>
                      {role.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleAssignRole}>Assign</Button>
          <DialogClose>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
