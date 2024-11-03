import { useAppDispatch, useAppSelector } from "@/store/store";
import { addCommunes } from "@/store/reducers/CommuneReducer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "@/config/config";
import { useToast } from "../use-toast";
export const useFetchUserCommunes = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const fetchCommunes = async () => {
        if (!user) return
        try {
            setIsLoading(true);
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/user/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (status === 200) {
                dispatch(addCommunes(data.communes))
            }
        } catch (err: any) {
            console.log(err);
            toast({
                title: "Error",
                description: "An error occured while fetching your communes",
                variant: "destructive"
            })

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCommunes()
    }, [])
    return { isLoading, fetchCommunes }
}



