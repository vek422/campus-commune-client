import { Outlet, useParams } from "react-router-dom";
import PageLayout from "../PageLayout";
import CommuneSidebarNav from "./Components/CommuneSidebar";
import { useFetchCommune } from "@/hooks/api/useFetchCommune";
import { useEffect } from "react";
export default function CommuneLayout() {
  //fetch commune here
  const { communeId } = useParams();
  const { isLoading, error, commune, fetchCommune } =
    useFetchCommune(communeId);

  useEffect(() => {
    fetchCommune();
  }, []);

  return (
    <PageLayout sidebar={<CommuneSidebarNav commune={commune} />}>
      <>
        <Outlet context={[commune]} />
      </>
    </PageLayout>
  );
}
