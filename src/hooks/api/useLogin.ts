import { BACKEND_BASE_URL } from "@/config/config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { useAppDispatch } from "@/store/store";
import { login as setLogin } from "@/store/reducers/authReducer";
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const login = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const { data: response, status } = await axios.post(
        `${BACKEND_BASE_URL}/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status === 200) {
        toast({
          title: "Logged In",
          description: "You have successfully logged in",
        });
        dispatch(setLogin(response));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data.message || "An error occurred during login"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    data,
  };
};
