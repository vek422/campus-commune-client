import PageLayout from "./PageLayout";
export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col w-full md:w-3/4 p-2 max-h-[100vh] gap-5 pb-20 overflow-scroll"></div>
    </PageLayout>
  );
}
