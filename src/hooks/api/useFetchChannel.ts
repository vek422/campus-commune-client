import { BACKEND_BASE_URL } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react";

import { addChannels, addThreads } from "@/store/reducers/CommuneReducer";

export const useFetchChannel = ({ communeId, channelId }: { communeId: string | undefined, channelId: string | undefined }) => {


    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState()
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const fetchChannel = async () => {
        if (!channelId || !communeId) return
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
            try {
                dispatch(addThreads(data.channel.threads))
            } catch (err) {
                console.log("Error in dispatching actions:", err);
            }
            setPage(state => state + 1)
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
        fetchChannel,
    }
}
