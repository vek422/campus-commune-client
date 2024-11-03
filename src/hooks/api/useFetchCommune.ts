import { BACKEND_BASE_URL } from "@/config/config";
import { addChannels, addCommune } from "@/store/reducers/CommuneReducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react";


export const useFetchCommune = (communeId: string | undefined) => {
    const { token } = useAppSelector(state => state.auth);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const fetchCommune = async () => {
        if (!communeId) return

        try {
            setIsloading(true);
            const { status, data } = await axios.get(`${BACKEND_BASE_URL}/commune/${communeId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            );
            if (status === 200) {
                try {
                    dispatch(addCommune(data.commune));
                } catch (error) {
                    console.error("Error in dispatching actions:", error);
                }

            } else {
                setError("Something went wrong");
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsloading(false)
        }
    }

    return {
        isLoading, error, fetchCommune
    }

}