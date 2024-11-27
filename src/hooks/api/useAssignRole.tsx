import { BACKEND_BASE_URL } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";
import { assignRole as assignRoleReducer } from "@/store/reducers/CommuneReducer";
export const useAssignRole = (communeId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const assignRole = async ({
    userId,
    roleId,
    handleClose,
  }: {
    userId: string;
    roleId: string;
    handleClose: () => void;
  }) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.post(
        `${BACKEND_BASE_URL}/commune/${communeId}/assign-role`,
        { userId, roleId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        toast({
          title: "Role assigned successfully",
          description: "success",
        });
        handleClose();
        dispatch(assignRoleReducer({ communeId, userId, role: data.role }));
        console.log(data);
      } else {
        toast({
          title: "Role assigned failed",
          description: "error",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Role assigned failed",
        description: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    assignRole,
    isLoading,
  };
};
