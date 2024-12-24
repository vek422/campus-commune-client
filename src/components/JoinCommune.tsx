import { useAppSelector } from "@/store/store";
import { Button } from "./ui/button";
import { useJoinCommune } from "@/hooks/api/useJoinCommune";
import { useParams } from "react-router-dom";

export const JoinCommune = ({
  hasJoinedCommune,
}: {
  hasJoinedCommune: boolean;
}) => {
  const { communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const { joinCommune } = useJoinCommune(commune);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex gap-2">
      {!hasJoinedCommune && (
        <Button
          className="max-w-min text-foreground font-semibold"
          variant={hasJoinedCommune ? "link" : "outline"}
          size="sm"
          disabled={hasJoinedCommune}
          onClick={() => joinCommune(user?._id as string)}
        >
          {hasJoinedCommune ? "Joined" : "Join"}
        </Button>
      )}
    </div>
  );
};
