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
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loadingButton";
import { useAddRole } from "@/hooks/api/useAddRole";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddRoleDialog() {
  const { communeId = "" } = useParams();
  const { addRole, isLoading } = useAddRole({ communeId });
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseDialog = () => {
    setIsOpen(false);
  };
  const handleAddRole = () => {
    if (!roleName) {
      return;
    }
    addRole({ roleName, roleDescription, handleCloseDialog });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="w-7 h-7 rounded-full"
        >
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader className="font-bold">Add New Role</DialogHeader>
        <DialogDescription className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Role Description"
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button variant={"destructive"}>Cancel</Button>
          </DialogClose>
          <LoadingButton
            variant={"default"}
            isLoading={isLoading}
            onClick={handleAddRole}
          >
            Create
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
