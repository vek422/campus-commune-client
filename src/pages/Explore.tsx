import { Input } from "@/components/ui/input";
import PageLayout from "./PageLayout";
import { Loader2, Search } from "lucide-react";
import { CommuneCard } from "@/components/CommuneCard";
import { useFetchCommunes } from "@/hooks/api/useFetchCommunes";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Explore() {
  const { fetchCommune, hasMore, communes, isLoading, searchCommune } =
    useFetchCommunes();
  const [searchedCommunes, setSearchedCommunes] = useState([]);
  const [searchString, setSearchString] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const communes = await searchCommune(searchString);
    setSearchedCommunes(communes);
  };
  useEffect(() => {
    fetchCommune();
  }, []);

  return (
    <PageLayout>
      <div className="w-full flex justify-center flex-col items-center">
        <form
          onSubmit={handleFormSubmit}
          className="w-1/2 flex items-center max-h-min"
        >
          <Input
            placeholder="What are you looking for?"
            className=""
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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

        <div className="w-full h-screen pb-32 flex flex-wrap gap-8 pt-10 overflow-scroll">
          {isLoading ? (
            <div className="flex justify-center items-center h-[82vh] w-full">
              <div className="animate-spin ">
                <Loader2 size={24} />
              </div>
            </div>
          ) : searchedCommunes?.length > 0 ? (
            searchedCommunes?.map((commune) => (
              <CommuneCard
                img={commune?.profileUri}
                description={commune?.description}
                name={commune?.name}
                communeId={commune?._id}
              />
            ))
          ) : (
            communes &&
            communes?.map((commune) => (
              <CommuneCard
                img={commune?.profileUri}
                description={commune?.description}
                name={commune?.name}
                communeId={commune?._id}
              />
            ))
          )}
          <div className="w-full flex justify-center ">
            {hasMore && (
              <Button variant={"link"} onClick={fetchCommune}>
                Load More
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
