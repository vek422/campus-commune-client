import { BACKEND_BASE_URL } from "@/config/config";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  joinCommune as joinCommuneReducer,
  leaveCommune as leaveCommuneReducer,
} from "@/store/reducers/authReducer";
import { Commune } from "@/store/reducers/CommuneReducer";
export const useJoinCommune = (commune: Commune) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const joinCommune = async (userId: string) => {
    if (!commune || !commune?._id) return;
    try {
      setIsLoading(true);
      const { status } = await axios.post(
        `${BACKEND_BASE_URL}/commune/join`,
        {
          userId,
          communeId: commune._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        setSuccess(true);
        console.log("Dispatching the commune join reducer");
        dispatch(joinCommuneReducer(commune));
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
      const { status } = await axios.post(
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
        dispatch(leaveCommuneReducer(communeId));
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
