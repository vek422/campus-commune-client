import CommuneMenu from "@/components/CommuneMenu";
import { JoinCommune } from "@/components/JoinCommune";
import { MemberListCard } from "@/components/MemberListCard";
import SimpleLoader from "@/components/SimpleLoader";
import { Thread } from "@/components/Thread/Thread";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchCommuneFeed } from "@/hooks/api/useFetchCommuneFeed";
import { User } from "@/store/reducers/authReducer";
import { useAppSelector } from "@/store/store";
import { useParams } from "react-router-dom";

export default function CommuneHome() {
  const { communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const user = useAppSelector((state) => state.auth.user);
  const userCommuneIds = user?.communes.map((commune) => commune._id) || [];
  const hasJoinedCommune = userCommuneIds.length
    ? userCommuneIds.includes(communeId)
    : false;
  const communeMembers = commune?.members as User[];
  const { isLoading, feed } = useFetchCommuneFeed(communeId);

  return (
    <div className="flex gap-2 w-full md:pr-10">
      <div className="flex md:w-3/4 flex-col  w-full">
        {/* header desktop  */}
        <div className="hidden gap-5 h-60 sm:h-52 relative md:flex flex-col md:flex-row md:items-center pl-5 bg-accent md:rounded-xl overflow-hidden ">
          <div className="rounded-2xl md:min-h-44 md:min-w-44 w-44 h-44 ">
            <img
              src={commune?.profileUri}
              alt="commune"
              className="w-full h-full object-cover overflow-hidden rounded-xl"
            />
          </div>
          <div className="h-full flex flex-col gap-2 p-2 text-black ">
            <h1 className="text-4xl font-bold">{commune?.name}</h1>
            <ScrollArea className="rounded-lg h-32 hidden md:block">
              {commune?.description}
            </ScrollArea>
            <div className="absolute right-0">
              {hasJoinedCommune && <CommuneMenu communeId={communeId} />}
            </div>
            {!hasJoinedCommune && (
              <JoinCommune hasJoinedCommune={hasJoinedCommune} />
            )}
          </div>
        </div>
        {/* Header Mobile */}
        <div className="md:hidden h-56 bg-accent relative text-black px-2 flex gap-2 items-center">
          <div className="absolute right-0 top-0 text-black">
            {hasJoinedCommune && <CommuneMenu communeId={communeId} />}
          </div>
          <div className="rounded-2xl  min-w-40 min-h-40 ">
            <img
              src={commune?.profileUri}
              alt="commune"
              className="w-full h-full object-cover overflow-hidden rounded-xl"
            />
          </div>
          <div className="">
            <h1 className="text-2xl font-bold">{commune?.name}</h1>
            <ScrollArea className="h-32">
              <p className="">{commune?.description}</p>
            </ScrollArea>
          </div>
        </div>
        <p className="text-md font-semibold p-2">Recent Threads</p>
        <ScrollArea className="h-[70vh] md:h-[60vh] py-5 px-2">
          <div className="flex flex-col gap-5">
            {isLoading && <SimpleLoader />}
            {feed &&
              !isLoading &&
              feed.map((post) => <Thread key={post?._id} thread={post} />)}
          </div>
        </ScrollArea>
      </div>

      <div className="w-1/4 bg-secondary/20 rounded-lg hidden md:flex flex-col  max-h-[50vh] gap-2">
        <div className="flex gap-2 items-center bg-background border p-2 rounded-lg rounded-b-none">
          <h1 className="font-semibold text-secondary-foreground">Members</h1>
          <p className="text-xs text-muted-foreground">
            {commune?.members?.length}
          </p>
        </div>

        <ScrollArea className="flex flex-col gap-2">
          {communeMembers &&
            communeMembers.map((member) => (
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
