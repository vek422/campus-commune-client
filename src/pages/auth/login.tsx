import { Topbar } from "@/components/topbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/forms/login";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className=" flex justify-center items-center w-full h-screen">
      <Topbar />
      <Card className="bg-transparent min-w-96 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex gap-1 justify-end  text-xs">
          <p className="">Dont have an account? </p>
          <Link to={"/register"} className="text-primary underline">
            register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
