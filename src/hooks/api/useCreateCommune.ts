import { useState } from "react";
import { useToast } from "../use-toast";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useSocket } from "@/context/SocketContext";
import { Commune } from "@/store/reducers/CommuneReducer";

interface CreateCommuneValues {
    name: string;
    description: string;
    profileImage: any;
    profileUri: string;
    createdBy: string;
}
export const useCreateCommune = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Commune>()
    const { toast } = useToast();
    const { token } = useAppSelector(state => state.auth)
    const socket = useSocket()
    const createCommune = async (values: CreateCommuneValues) => {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("description", values.description);
            if (values?.profileImage) {
                formData.append('profileImage', values.profileImage);
            }
            formData.append("createdBy", values.createdBy);
            formData.append('profileUri', values.profileUri);


            const response = await axios.postForm(`${BACKEND_BASE_URL}/commune/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                toast({
                    title: "Failed to create commune",
                    description: response.data.message,
                })
            }
            // TODO : needs to add validations
            setData(response.data);
            if (socket?.connected) {
                socket.emit("join-room", response.data._id, values.createdBy)
            }
            toast({
                title: "Commune created successfully"
            });
        } catch (error: any) {
            setError(error);
            toast({
                title: "Failed to create commune",
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        createCommune,
        isLoading,
        error,
        data
    }

}