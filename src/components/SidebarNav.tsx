import { useAppSelector } from "@/store/store";
import NavLink from "./NavLink";
import { Button } from "./ui/button";
import { LoaderCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useFetchUserCommunes } from "@/hooks/api/useFetchUserCommunes";

export default function SidebarNav() {
  const { communes } = useAppSelector((state) => state.commune);
  const { isLoading } = useFetchUserCommunes();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <nav className="mt-14 py-2 rounded-lg overflow-hidden px-4 h-full flex flex-col gap-4">
      <div className="flex flex-col ">
        <h2 className="text-lg font-semibold">General</h2>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/communes">Communes</NavLink>
        <NavLink href="/">Saved Threads</NavLink>
        <NavLink href="/">Drafts</NavLink>
      </div>
      <div className="flex flex-col overflow-x-hidden">
        <h2 className="text-lg font-semibold ">Communes</h2>
        <div className="overflow-scroll max-h-[20vh] flex flex-col">
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : communes ? (
            Array.from(Object.values(communes)).map((commune) =>
              typeof commune === "string" ? null : (
                <NavLink key={commune?._id} href={`/commune/${commune._id}`}>
                  {commune.name}
                </NavLink>
              )
            )
          ) : (
            <p className="italic font-light text-secondary-foreground">
              You are not part of any communes
            </p>
          )}
        </div>
      </div>
      <div className="">
        {user && user?.globalRole?.name === "admin" && (
          <Link to="/commune/create-commune" className="text-primary underline">
            <Button variant={"expandIcon"} className="font-semibold">
              <Plus size={24} className="mr-1 h-4 w-4" />
              Create Commune
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
