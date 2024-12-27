/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useParams } from "react-router-dom";
import PageLayout from "../PageLayout";
import CommuneSidebarNav from "./Components/CommuneSidebar";
import { useFetchCommune } from "@/hooks/api/useFetchCommune";
import { useEffect } from "react";
import SimpleLoader from "@/components/SimpleLoader";
export default function CommuneLayout() {
  //fetch commune here
  const { communeId = "" } = useParams();
  const { fetchCommune, isLoading } = useFetchCommune(communeId);
  useEffect(() => {
    fetchCommune();
  }, [communeId]);
  if (isLoading) return <SimpleLoader />;
  return (
    <PageLayout sidebar={<CommuneSidebarNav />}>
      <Outlet />
    </PageLayout>
  );
}
