import { useAppSelector } from "@/store/store";
import { Button } from "./ui/button";
import { useJoinCommune } from "@/hooks/api/useJoinCommune";
import { Commune } from "@/store/reducers/CommuneReducer";

export const JoinCommune = ({ commune }: { commune: Commune }) => {
  const { joinCommune } = useJoinCommune(commune?._id);
  const user = useAppSelector((state) => state.auth.user);
  console.log(user?._id);
  const hasAlreadyJoined = user?.communes?.includes(commune?._id) || false;
  console.log(hasAlreadyJoined);
  return (
    <div className="flex gap-2">
      {!hasAlreadyJoined && (
        <Button
          className="max-w-min text-foreground font-semibold"
          variant={hasAlreadyJoined ? "link" : "outline"}
          size="sm"
          disabled={hasAlreadyJoined}
          onClick={() => joinCommune(user?._id)}
        >
          {hasAlreadyJoined ? "Joined" : "Join"}
        </Button>
      )}
    </div>
  );
};
