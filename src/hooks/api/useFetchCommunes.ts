import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react";
import { useToast } from "../use-toast";

export const useFetchCommunes = () => {
    const limit = 10;
    const [hasMore, setHasMore] = useState(true);
    const [communes, setCommunes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { token } = useAppSelector(state => state.auth)
    const { toast } = useToast();

    const searchCommune = async (search: string) => {
        if (!search) return;
        try {
            setIsLoading(true)
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/search`, {
                params: {
                    name: search
                },
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })
            if (status === 200) {
                return data.communes;
            } else {
                return [];
            }
        } catch (err: any) {
            toast({
                title: "Error",
                variant: "destructive",
                description: err.message
            })
        } finally {
            setIsLoading(false)
        }
    }
    const fetchCommune = async () => {
        if (!hasMore) return;
        try {
            setIsLoading(true)
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/communes`, {
                params: {
                    pageNumber: page,
                    limit
                },
                headers: {
                    Authorization: `Bearer ${token}`

                }
            })
            if (status === 200) {
                setCommunes(state => [...state, ...data?.communes]);
                setHasMore(data.hasMore);
                if (data.hasMore) setPage(page => page + 1)
            }
        } catch (err: any) {
            toast({
                title: "Error",
                variant: "destructive",
                description: err.message
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        fetchCommune,
        hasMore,
        communes,
        isLoading,
        searchCommune
    }

}