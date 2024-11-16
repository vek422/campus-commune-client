import { BACKEND_BASE_URL } from "@/config/config";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function CommuneCard({
  img,
  name,
  description,
  communeId,
}: {
  img: string;
  name: string;
  description: string;
  communeId: string;
}) {
  return (
    <Card className="w-48 max-h-min flex items-center flex-col p-2 gap-1">
      <CardHeader className="p-2">
        <img
          src={`${BACKEND_BASE_URL}/static/${img}`}
          alt="commune image"
          className="w-24 h-24 object-cover rounded-full"
        />
      </CardHeader>
      <CardContent className="flex flex-col items-center h-20 max-h-20 gap-2 p-2 w-full">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-center text-xs max-w-full overflow-hidden text-ellipsis">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-center pb-0 ">
        <Button variant={"link"} className="w-full">
          <Link to={`/commune/${communeId}`}>View More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
