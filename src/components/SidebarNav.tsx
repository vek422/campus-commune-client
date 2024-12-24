import { useAppSelector } from "@/store/store";
import NavLink from "./NavLink";
import { LoaderCircle } from "lucide-react";
import { useFetchUserCommunes } from "@/hooks/api/useFetchUserCommunes";

export default function SidebarNav() {
  return (
    <nav className="mt-14 py-2 rounded-lg overflow-hidden px-4 h-full flex flex-col gap-4">
      <NavItems />
    </nav>
  );
}

export const NavItems = () => {
  // const { communes } = useAppSelector((state) => state.commune);
  const { isLoading } = useFetchUserCommunes();
  const { user } = useAppSelector((state) => state.auth);
  const communes = useAppSelector((state) => state.auth.user?.communes);
  return (
    <>
      <div className="flex flex-col ">
        <h2 className="text-lg font-semibold">General</h2>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/communes">Commune</NavLink>
        {user && user?.globalRole?.name === "admin" && (
          <NavLink href="/commune/create-commune">Create Commune</NavLink>
        )}
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
    </>
  );
};
