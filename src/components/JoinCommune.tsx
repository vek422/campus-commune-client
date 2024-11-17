import { useAppSelector } from "@/store/store";
import { Button } from "./ui/button";
import { useJoinCommune } from "@/hooks/api/useJoinCommune";

export const JoinCommune = ({ communeId }: { communeId: string }) => {
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const { isLoading, success, joinCommune, leaveCommune } =
    useJoinCommune(communeId);
  const user = useAppSelector((state) => state.auth.user);

  const hasAlreadyJoined =
    commune?.members.map((commune) => commune._id).includes(user?._id) ||
    success;
  return (
    <div className="flex gap-2">
      <Button
        className="max-w-min text-foreground font-semibold"
        variant={hasAlreadyJoined ? "link" : "outline"}
        size="sm"
        disabled={hasAlreadyJoined}
        onClick={() => joinCommune(user?._id)}
      >
        {hasAlreadyJoined ? "Joined" : "Join"}
      </Button>
      {hasAlreadyJoined && (
        <Button
          className="max-w-min text-foreground font-semibold"
          variant={"destructive"}
          size="sm"
          disabled={!hasAlreadyJoined}
          onClick={() => leaveCommune(user?._id)}
        >
          Leave
        </Button>
      )}
    </div>
  );
};
