import { useParams } from "react-router-dom";
import { useFetchChannel } from "@/hooks/api/useFetchChannel";

import { Thread } from "@/components/Thread/Thread";
import { CreateThread } from "@/components/Thread/CreateThread";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { Thread as ThreadType } from "@/store/reducers/CommuneReducer";

const selectThread = createSelector(
  (state) => state.commune.channels,
  (state) => state.commune.threads,
  (_state, channelId: string) => channelId,
  (channels, threads, channelId) => {
    return channels[channelId]?.threads.map(
      (threadId: string) => threads[threadId]
    );
  }
);

export default function Channel() {
  const { communeId = "", channelId = "" } = useParams();
  const channel = useAppSelector((state) => state.commune.channels[channelId]);
  const threads = useAppSelector((state) => selectThread(state, channelId));
  // const commune = useAppSelector((state) => state.commune.communes[communeId]);
  const { isLoading, fetchChannel, hasMore } = useFetchChannel({
    communeId,
    channelId,
  });
  useEffect(() => {
    fetchChannel();
  }, []);
  if (isLoading && !threads) return <div>Loading...</div>;
  return (
    <div className="flex ">
      <div className="flex flex-col h-svh md:w-3/4 w-full px-2">
        <div className="h-5">
          <p className="font-semibold text-lg">{channel?.name}</p>
        </div>
        <div className="pt-5 flex flex-col flex-1 pb-40 md:pb-20 gap-5  w-full overflow-scroll ">
          {threads &&
            threads?.map((thread: ThreadType) => {
              return <Thread key={thread._id} thread={thread} />;
            })}

          {hasMore && (
            <Button onClick={() => fetchChannel()} variant={"link"}>
              Load More
            </Button>
          )}
        </div>
        <div className="fixed bottom-0 right-0 backdrop-blur-sm md:hidden p-5 w-full flex justify-center">
          <Button variant="default" className="w-full" size={"lg"}>
            Create Thread
          </Button>
        </div>
      </div>
      <div className="hidden md:block w-1/4 h-screen px-10 py-5">
        <CreateThread />
      </div>
    </div>
  );
}
