/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useParams } from "react-router-dom";
import PageLayout from "../PageLayout";
import CommuneSidebarNav from "./Components/CommuneSidebar";
import { useFetchCommune } from "@/hooks/api/useFetchCommune";
import { useEffect } from "react";
export default function CommuneLayout() {
  //fetch commune here
  const { communeId = "" } = useParams();
  const { fetchCommune } = useFetchCommune(communeId);
  useEffect(() => {
    fetchCommune();
  }, [communeId]);
  return (
    <PageLayout sidebar={<CommuneSidebarNav />}>
      <Outlet />
    </PageLayout>
  );
}
