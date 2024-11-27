import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import RoleCard from "./RoleCard";
import AddRoleDialog from "./AddRoleDialog";

export default function CommuneRoles({ roles }) {
  return (
    <div className="w-56  bg-secondary/50 h-44 rounded-md">
      <div className="flex justify-between p-2 bg-background border border-b-0 rounded-md rounded-b-none">
        <p className="font-semibold">Roles</p>
        <AddRoleDialog />
      </div>
      <ScrollArea className="h-32">
        {roles.map((role, i) => (
          <RoleCard name={role.name} />
        ))}
      </ScrollArea>
    </div>
  );
}
