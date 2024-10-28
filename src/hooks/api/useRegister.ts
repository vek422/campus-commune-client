import { useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config/config";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
interface RegisterProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
import { redirect } from "react-router-dom";
export const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);
  const { toast } = useToast()
  const navigate = useNavigate()
  const register = async (data: RegisterProps) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const { data: response, status } = await axios.post(
        `${BACKEND_BASE_URL}/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status !== 201) {
        throw new Error("An error occurred while registering");
      }
      setData(response);
      toast({
        title: "Success",
        description: "Account created successfully",
      })
      navigate("/login")
    } catch (error) {
      //TODO ADD ERROR HANDLER
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred while registering");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, register };
};
