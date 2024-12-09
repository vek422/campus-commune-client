import { useAppDispatch, useAppSelector } from "@/store/store"
import { useState } from "react"
import { useToast } from "../use-toast"
import axios from "axios"
import { BACKEND_BASE_URL } from "@/config/config"
import { addThreads, Thread } from "@/store/reducers/CommuneReducer"

export const useSearchThread = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.auth)
    const { toast } = useToast();
    const [threads, setThreads] = useState<Thread[]>([]);
    const dispatch = useAppDispatch()
    const searchThread = async (search: string) => {
        if (!search) return;
        try {
            setIsLoading(true)
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/thread/semantic-search`, {
                params: {
                    query: search,
                    nThreads: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status === 200) {
                setThreads(data)
                dispatch(addThreads(data))
            } else {
                setThreads([])
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

    return { isLoading, searchThread, threads }
}