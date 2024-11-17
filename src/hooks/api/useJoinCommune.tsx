import { BACKEND_BASE_URL } from "@/config/config";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { useAppSelector } from "@/store/store";

export const useJoinCommune = (communeId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const joinCommune = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.post(
        `${BACKEND_BASE_URL}/commune/join`,
        {
          userId,
          communeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setSuccess(true);
        toast({
          title: "Success",
          description: "You have joined the commune",
        });
      } else {
        setSuccess(false);
      }
    } catch (err: any) {
      console.log(err);
      setSuccess(false);
      toast({
        title: "Error",
        description: err?.response?.data?.message || err.message,
      });
    }
  };
  const leaveCommune = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.post(
        `${BACKEND_BASE_URL}/commune/leave`,
        {
          userId,
          communeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setSuccess(false);
        toast({
          title: "Success",
          description: "You have left the commune",
        });
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      console.log(err);
      setSuccess(false);
      toast({
        title: "Error",
        description: err?.response?.data?.message || err.message,
      });
    }
  };
  return {
    joinCommune,
    isLoading,
    success,
    leaveCommune,
  };
};
