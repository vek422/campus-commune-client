import CommuneMenu from "@/components/CommuneMenu";
import { JoinCommune } from "@/components/JoinCommune";
import { MemberListCard } from "@/components/MemberListCard";
import { Thread } from "@/components/Thread/Thread";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BACKEND_BASE_URL } from "@/config/config";
import { useFetchCommuneFeed } from "@/hooks/api/useFetchCommuneFeed";
import { useAppSelector } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function CommuneHome() {
  const { communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const user = useAppSelector((state) => state.auth.user);
  const hasJoineCommune = user?.communes?.includes(communeId) || false;
  const { isLoading, fetchCommuneFeed, feed } = useFetchCommuneFeed(communeId);
  return (
    <div className="flex gap-2 w-full pr-10">
      <div className="flex w-3/4 flex-col">
        {/* header */}
        <div className="gap-5 h-52  relative flex items-center pl-5 bg-accent rounded-xl overflow-hidden ">
          <div className="rounded-2xl min-w-44 min-h-44 h-44 w-44">
            <img
              src={commune?.profileUri}
              alt="commune"
              className="w-full h-full object-cover overflow-hidden rounded-xl"
            />
          </div>
          <div className="h-full flex flex-col gap-2 p-2 text-black ">
            <h1 className="text-4xl font-bold">{commune?.name}</h1>
            <ScrollArea className="rounded-lg h-32">
              {commune?.description}
            </ScrollArea>
            <div className="absolute right-0">
              {hasJoineCommune && <CommuneMenu communeId={communeId} />}
            </div>
            <JoinCommune commune={commune} />
          </div>
        </div>
        <ScrollArea className="h-[60vh] py-5">
          <p className="text-sm font-semibold">Recent Threads</p>
          <div className="flex flex-col gap-5 ">
            {isLoading && (
              <div className="flex justify-center items-center h-[82vh] w-full">
                <div className="animate-spin ">
                  <Loader2 size={24} />
                </div>
              </div>
            )}
            {feed &&
              !isLoading &&
              feed.map((post) => <Thread key={post?._id} thread={post} />)}
          </div>
        </ScrollArea>
      </div>

      <div className="w-1/4 bg-secondary/20 rounded-lg flex flex-col  max-h-[50vh] gap-2">
        <div className="flex gap-2 items-center bg-background border p-2 rounded-lg rounded-b-none">
          <h1 className="font-semibold text-secondary-foreground">Members</h1>
          <p className="text-xs text-muted-foreground">
            {commune?.members?.length}
          </p>
        </div>

        <ScrollArea className="flex flex-col gap-2">
          {commune?.members.map((member) => (
            <MemberListCard
              showContextMenu={false}
              key={member?._id}
              _id={member?._id}
              firstName={member?.firstName}
              lastName={member?.lastName}
              profileUri={member?.profile_uri}
              role={commune?.roles[member?._id]?.name}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
