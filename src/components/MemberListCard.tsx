import { Ellipsis, EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import MemberListMenu from "@/pages/Commune/Components/MemberListMenu";
import { useAppSelector } from "@/store/store";

export const MemberListCard = ({
  profileUri,
  firstName,
  lastName,
  _id,
  role,
  showContextMenu = false,
}: {
  firstName: string;
  lastName: string;
  profileUri: string;
  _id: string;
  role: string;
  showContextMenu: boolean;
}) => {
  const { _id: userId } = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex items-center gap-2 hover:bg-secondary/60 p-1 rounded-lg hover:text-secondary-foreground transition-all duration-300 cursor-pointer">
      <Avatar className="h-7 w-7 text-inherit">
        <AvatarFallback className="text-xs text-foreground">{`${
          firstName && firstName[0]
        }${lastName && lastName[0]}`}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center gap-4 w-full">
          <p className="text-xs font-semibold">
            {firstName} {lastName}
          </p>
          {role && (
            <Badge variant={"outline"} className="italic">
              {role}
            </Badge>
          )}
        </div>
        <div>
          {showContextMenu && userId !== _id && (
            <MemberListMenu user={{ firstName, lastName, _id, role }} />
          )}
        </div>
      </div>
    </div>
  );
};
