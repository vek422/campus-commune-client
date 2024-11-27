import { MemberListCard } from "@/components/MemberListCard";
import { useAppSelector } from "@/store/store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useParams } from "react-router-dom";

export default function CommuneMembers() {
  const { communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = commune?.roles[user?._id]?.name === "admin";

  if (!commune) return null;
  return (
    <div className="w-2/5 bg-secondary/50 h-full rounded-md">
      <div className="flex justify-between p-2 bg-background border border-b-0 rounded-md rounded-b-none">
        <p className="font-semibold">Members</p>
      </div>
      <ScrollArea>
        {commune.members.map((member, i) => (
          <MemberListCard
            _id={member?._id as string}
            firstName={member?.firstName as string}
            lastName={member?.lastName as string}
            profileUri={member?.profile_uri as string}
            role={commune?.roles[member?._id]?.name as string}
            showContextMenu={isAdmin}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
