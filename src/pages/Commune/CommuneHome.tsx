import { Button } from "@/components/ui/button";
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useParams } from "react-router-dom";

export default function CommuneHome() {
  const { communeId = "" } = useParams();
  const commune = useAppSelector((state) => state.commune.communes[communeId]);
  return (
    <div className="flex flex-col gap-2 w-full pr-10">
      {/* header */}
      <div className="gap-5 h-52  relative  flex items-center pl-5 bg-accent rounded-xl overflow-hidden w-3/4">
        <div className="rounded-2xl w-44 h-44">
          <img
            src={`${BACKEND_BASE_URL}/static/${commune?.profileUri}`}
            alt="commune"
            className="w-full h-full object-cover overflow-hidden rounded-xl"
          />
        </div>
        <div className="h-full flex flex-col gap-2 p-2  w-1/2 text-black ">
          <h1 className="text-4xl font-bold">{commune?.name}</h1>
          <p className=" rounded-lg h-20  ">{commune?.description}</p>
          <Button
            className="max-w-min text-foreground font-semibold"
            variant={"outline"}
          >
            follow
          </Button>
        </div>
        {/* <div className="w-1/2 h-full bg-background/20 mx-10"></div> */}
      </div>
      <div className="w-3/4 flex flex-col gap-5 h-screen overflow-scroll pb-72"></div>
    </div>
  );
}
