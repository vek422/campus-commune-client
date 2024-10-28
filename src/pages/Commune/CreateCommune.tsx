import { CreateCommuneForm } from "@/forms/createCommune";
import PageLayout from "../PageLayout";

export default function CreateCommune() {
  return (
    <PageLayout>
      <div className="flex justify-center flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Create Commune</h1>
        <div className="flex">
          <CreateCommuneForm />
        </div>
      </div>
    </PageLayout>
  );
}
