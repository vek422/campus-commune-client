import { Topbar } from "@/components/topbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/forms/register";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Topbar />
      <Card className="bg-transparent min-w-96 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex gap-1 justify-end  text-xs">
          <p className="">Already have an account?</p>
          <Link to="/login" className="text-primary underline">
            login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
