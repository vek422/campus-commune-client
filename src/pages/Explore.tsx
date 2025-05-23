import PageLayout from "./PageLayout";
import { Loader2, Search } from "lucide-react";
import { CommuneCard } from "@/components/CommuneCard";
import { useFetchCommunes } from "@/hooks/api/useFetchCommunes";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Commune } from "@/store/reducers/CommuneReducer";
import InputWithIcon from "@/components/InputWithIcon";

export default function Explore() {
  const { fetchCommune, hasMore, communes, isLoading, searchCommune } =
    useFetchCommunes();
  const [searchedCommunes, setSearchedCommunes] = useState<Commune[]>([]);
  const [searchString, setSearchString] = useState("");
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const communes = await searchCommune(searchString);
    setSearchedCommunes(communes);
  };
  useEffect(() => {
    fetchCommune();
  }, []);

  return (
    <PageLayout>
      <div className="w-full flex justify-center flex-col items-center px-4 sm:px-0">
        <form
          onSubmit={handleFormSubmit}
          className="w-full flex items-center max-h-min justify-center sm:w-1/2 px-5"
        >
          <InputWithIcon
            Icon={Search}
            onChange={setSearchString}
            value={searchString}
            placeholder="Search Communes"
            onSubmit={handleFormSubmit}
          />
        </form>

        <div className="w-full h-screen pb-32 items-center sm:items-start flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 pt-10 overflow-scroll">
          {isLoading ? (
            <div className="flex justify-center items-center h-[82vh] w-full">
              <div className="animate-spin ">
                <Loader2 size={24} />
              </div>
            </div>
          ) : searchedCommunes?.length > 0 ? (
            searchedCommunes?.map((commune) => (
              <CommuneCard
                key={commune?._id}
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
                key={commune?._id}
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
