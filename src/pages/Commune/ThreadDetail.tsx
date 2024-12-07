import { ThreadComments, ThreadMedia } from "@/components/Thread/Thread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BACKEND_BASE_URL } from "@/config/config";
import { useFetchThread } from "@/hooks/api/useFetchThread";
import { calculateAge } from "@/lib/calculateAge";
import { parseContent } from "@/lib/parseThreadContent";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ThreadDetail = () => {
  const { threadId = "", communeId = "" } = useParams();
  const { thread, fetchThread, isLoading } = useFetchThread();
  useEffect(() => {
    fetchThread(threadId);
  }, []);
  if (!thread && !isLoading) return null;
  if (!thread && isLoading)
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  return (
    <ScrollArea className="h-[90vh]">
      <div className="flex flex-col h-full gap-5 w-full px-5 pt-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">{thread?.title}</h1>
          <p className=" w-2/3">{parseContent(thread?.content)}</p>
        </div>
        <div>
          <div className="">{<ThreadMedia images={thread?.imagesUri} />}</div>
        </div>
        <div className="flex gap-1 flex-col">
          <p className="text-sm text-secondary-foreground ">Posted By : </p>
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={`${BACKEND_BASE_URL}/static/${thread?.createdBy?.profileUri}`}
                className="object-cover"
              />
              <AvatarFallback className="text-xs">
                {thread?.createdBy?.firstName.length > 0
                  ? thread.createdBy?.firstName[0]
                  : ""}{" "}
                {thread?.createdBy?.lastName.length > 0
                  ? thread?.createdBy?.lastName[0]
                  : ""}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-semibold">
              {thread.createdBy?.firstName} {thread.createdBy?.lastName}
            </p>
            <p className="pl-10 text-xs text-secondary-foreground font-semibold">
              {calculateAge(thread.createdAt)}
            </p>
          </div>
        </div>
        <Separator className="my-5" />

        <div className="">
          <ThreadComments thread={thread} />
        </div>
      </div>
    </ScrollArea>
  );
};

export default ThreadDetail;
