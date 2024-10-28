import SidebarNav from "@/components/SidebarNav";
import { Topbar } from "@/components/topbar";

export default function PageLayout({
  children,
  sidebar,
  topbar,
}: {
  children: JSX.Element;
  sidebar?: JSX.Element;
  topbar?: JSX.Element;
}) {
  return (
    <div className="w-screen h-screen bg-background flex flex-col overflow-hidden">
      {topbar ? topbar : <Topbar />}
      <div className="flex flex-1">
        <div className="hidden md:block md:min-w-[200px]">
          {sidebar ? sidebar : <SidebarNav />}
        </div>
        <div className="flex-1 pt-14">{children}</div>
      </div>
    </div>
  );
}
