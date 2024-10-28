import { useState } from "react";
import { useToast } from "../use-toast";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";

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
    const [data, setData] = useState<object | null>(null)
    const { toast } = useToast();
    const { token } = useAppSelector(state => state.auth)

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

            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const response = await axios.postForm(`${BACKEND_BASE_URL}/commune/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}}`
                }
            });
            if (response.status !== 200) {
                toast({
                    title: "Failed to create commune",
                    description: response.data.message,
                })
            }

            setData(response.data);
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