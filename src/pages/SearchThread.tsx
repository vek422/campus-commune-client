import { Input } from "@/components/ui/input";
import PageLayout from "./PageLayout";
import { Button } from "@/components/ui/button";
import { Loader, Loader2, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchThread } from "@/hooks/api/useSearchThread";
import { useState } from "react";
import { Thread } from "@/components/Thread/Thread";

export default function SearchThread() {
  const { isLoading, searchThread, threads } = useSearchThread();
  const [query, setQuery] = useState("");
  return (
    <PageLayout>
      <div className="w-full flex items-center flex-col">
        <form
          className="w-1/2 flex items-center max-h-min"
          onSubmit={(e) => {
            e.preventDefault();
            searchThread(query);
          }}
        >
          <Input
            placeholder="Search for threads"
            className=""
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full -translate-x-10"
          >
            <Search className="text-muted-foreground" size={20} />
          </Button>
        </form>
        {!threads.length && !isLoading && (
          <p className="pt-10 w-2/3 text-center font-2xl">
            Search smarter, not harder. Our semantic search engine understands
            the meaning behind your queries to deliver the most relevant
            threads.
          </p>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-[82vh] w-full">
            <div className="animate-spin ">
              <Loader2 size={24} />
            </div>
          </div>
        )}
        {threads && (
          <ScrollArea className="h-[82vh] w-full px-20 pt-10">
            <div className="flex flex-col gap-10">
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
