import { Loader2 } from "lucide-react";

export default function SimpleLoader() {
  return (
    <div className="flex justify-center items-center h-[82vh] w-full">
      <div className="animate-spin ">
        <Loader2 size={24} />
      </div>
    </div>
  );
}
