import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useFetchCommunePermissions } from "@/hooks/api/useFetchCommunePermissions";

export default function PermissionList() {
  const { communePermissions, channelPermissions } =
    useFetchCommunePermissions();

  return (
    <div className="w-56  bg-secondary/50  rounded-md">
      <div className="flex justify-between p-2 bg-background border border-b-0 rounded-md rounded-b-none">
        <p className="font-semibold">Permissions</p>
      </div>
      <ScrollArea className="h-[55vh] px-2 pb-2">
        {communePermissions && (
          <>
            <p className="text-xs font-semibold">Commune</p>
            <Separator />
          </>
        )}
        {communePermissions &&
          communePermissions.map((permission) => (
            <p className="text-xs px-2 py-1">{permission}</p>
          ))}
        {channelPermissions && (
          <>
            <p className="text-xs font-semibold">Channel</p>
            <Separator />
          </>
        )}
        {channelPermissions.map((permission) => (
          <p className="text-xs px-2 py-1">{permission}</p>
        ))}
      </ScrollArea>
    </div>
  );
}
