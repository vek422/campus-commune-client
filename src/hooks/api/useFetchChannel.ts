import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


export const useFetchChannel = ({ communeId, channelId }: { communeId: string, channelId: string }) => {
    const { token } = useAppSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [channel, setChannel] = useState();
    const [error, setError] = useState()
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [threads, setThreads] = useState<unknown>([])
    const fetchChannel = async () => {
        if (!hasMore) return
        setIsLoading(true)
        try {
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/${communeId}/channel/${channelId}`, {
                params: {
                    pageNumber: page,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status !== 200) {
                throw new Error("Something Went Wrong")
            }
            setThreads((threads: any) => [...threads, ...data.channel.threads])
            setChannel(data.channel);
            setPage(data.pageNumber + 1)
            setHasMore(data.hasMore)
        } catch (e: any) {
            console.log(e.message);
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }


    return {
        isLoading,
        error,
        hasMore,
        channel,
        threads,
        setThreads,
        fetchChannel,
    }
}
