import { Button } from "@/components/ui/button";
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";
import CommuneRoles from "./Components/CommuneRoles";
import CommuneMembers from "./CommuneMembers";
import PermissionList from "./Components/PermissionList";

export default function CommuneManage() {
  const { communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);

  if (!commune) return null;
  return (
    <div className="w-full h-full flex gap-4">
      <div className="w-3/4 flex flex-col gap-2">
        {/* the top section starts */}
        <div className="flex h-44 gap-4 ">
          <div className="rounded-2xl w-44 h-44 shadow-lg border">
            <img
              src={`${BACKEND_BASE_URL}/static/${commune?.profileUri}`}
              alt="commune"
              className="w-full h-full object-cover overflow-hidden rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{commune?.name}</p>
              <Button
                size={"icon"}
                className="rounded-full p-0 m-0 h-7 w-7"
                variant={"ghost"}
              >
                <Pencil size={14} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold text-secondary-foreground">
                {commune?.description}
              </p>
              <Button
                size={"icon"}
                className="rounded-full p-0 m-0 h-7 w-7"
                variant={"ghost"}
              >
                <Pencil size={14} />
              </Button>
            </div>
          </div>
        </div>
        {/* Top section ends */}
        <div className="flex h-full gap-2">
          <CommuneMembers />
        </div>
      </div>
      <div className="w-1/4 pr-4 gap-4 flex flex-col">
        <CommuneRoles roles={commune?.allRoles} />
        <PermissionList />
      </div>
    </div>
  );
}
