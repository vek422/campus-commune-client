import { useOutletContext, useParams } from "react-router-dom";
import { ChannelBreadcrumbs } from "./Components/ChannelBreadcrumbs";
import { useFetchChannel } from "@/hooks/api/useFetchChannel";

import { Thread } from "@/components/Thread/Thread";
import { CreateThread } from "@/components/Thread/CreateThread";
import { ThreadCardLoader } from "@/components/Loaders/ThreadCardLoader";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "@/config/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Channel() {
  const { communeId, channelId } = useParams();
  const [commune] = useOutletContext();
  const { isLoading, channel, threads, setThreads, fetchChannel, hasMore } =
    useFetchChannel({
      communeId,
      channelId,
    });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchChannel();
  }, []);

  return (
    <div className="flex ">
      <div className="flex flex-col h-svh w-3/4">
        <div className="h-5">
          <ChannelBreadcrumbs
            communeName={commune?.name}
            communeId={commune?._id}
            channelName={channel?.name}
          />
        </div>
        <div className="pt-5 flex flex-col flex-1 pb-20 gap-5  w-full overflow-scroll transition-all duration-1000">
          {threads &&
            threads?.map((thread) => {
              return <Thread key={thread._id} thread={thread} />;
            })}
          {isLoading &&
            new Array(4).map((_, index) => <ThreadCardLoader key={index} />)}
          {hasMore && (
            <Button onClick={() => fetchChannel()} variant={"link"}>
              Load More
            </Button>
          )}
        </div>
      </div>
      <div className="w-1/4 h-screen px-10 py-5">
        <CreateThread setThreads={setThreads} />
      </div>
    </div>
  );
}
