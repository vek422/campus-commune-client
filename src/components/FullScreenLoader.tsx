import { Loader2 } from "lucide-react";

export default function FullScreenLoader() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="animate-spin ">
        <Loader2 size={24} />
      </div>
    </div>
  );
}
