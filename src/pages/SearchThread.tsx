import PageLayout from "./PageLayout";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchThread } from "@/hooks/api/useSearchThread";
import { useState } from "react";
import { Thread } from "@/components/Thread/Thread";
import FullScreenLoader from "@/components/loader";
import InputWithIcon from "@/components/InputWithIcon";

export default function SearchThread() {
  const { isLoading, searchThread, threads } = useSearchThread();
  const [query, setQuery] = useState("");
  return (
    <PageLayout>
      <div className="w-full flex items-center flex-col pt-5">
        <form
          className="w-full b-white sm:w-1/2 flex items-center max-h-min justify-center px-5 "
          onSubmit={(e) => {
            e.preventDefault();
            searchThread(query);
          }}
        >
          <InputWithIcon
            Icon={Search}
            onChange={setQuery}
            value={query}
            placeholder="Search Threads"
            onSubmit={() => searchThread(query)}
          />
        </form>
        {!threads.length && !isLoading && (
          <p className="pt-10 w-full sm:w-2/3  text-center font-2xl text-secondary-foreground px-4">
            Search smarter, not harder. Our semantic search engine understands
            the meaning behind your queries to deliver the most relevant
            threads.
          </p>
        )}
        {isLoading && <FullScreenLoader />}
        {threads && (
          <ScrollArea className="h-[85vh] w-full sm:px-20 pt-10 px-2">
            <div className="flex flex-col gap-5 sm:gap-10 items-center">
              {threads &&
                threads.map((thread) => (
                  <Thread
                    key={thread?._id}
                    thread={thread}
                    showContext={false}
                  />
                ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </PageLayout>
  );
}
