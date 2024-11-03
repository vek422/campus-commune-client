import { Outlet, useParams } from "react-router-dom";
import PageLayout from "../PageLayout";
import CommuneSidebarNav from "./Components/CommuneSidebar";
import { useFetchCommune } from "@/hooks/api/useFetchCommune";
import { useEffect } from "react";
import { useAppSelector } from "@/store/store";
export default function CommuneLayout() {
  //fetch commune here
  const { communeId = "" } = useParams();
  const { isLoading, error, fetchCommune } = useFetchCommune(communeId);
  const commune = useAppSelector(
    (state) => state?.commune?.communes[communeId]
  );
  useEffect(() => {
    fetchCommune();
  }, []);

  return (
    <PageLayout sidebar={<CommuneSidebarNav commune={commune} />}>
      <>
        <Outlet />
      </>
    </PageLayout>
  );
}
