import { Skeleton } from "../ui/skeleton";
export const ThreadCardLoader = () => {
  return (
    <div
      className="w-full  min-h-max bg-secondary/30 border border-secondary rounded-xl p-2 
    flex flex-col gap-2 transition-all duration-500"
    >
      <div className="flex gap-2 ">
        <Skeleton className="rounded-full h-7 w-7" />
        <div className="flex gap-1 flex-col w-full">
          <div className="">
            <Skeleton className="h-10 w-52" />
            {/* <Skeleton className="h-10 w-full" /> */}
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          {/* <ThreadMedia images={thread?.imagesUri} /> */}
        </div>
      </div>
    </div>
  );
};
