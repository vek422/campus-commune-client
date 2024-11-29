import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchCommuneFeed = (communeId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.auth)
    const [feed, setFeed] = useState([])

    useEffect(() => {
        fetchCommuneFeed()
    }, [])
    const fetchCommuneFeed = async () => {
        setIsLoading(true);
        try {
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/${communeId}/feed`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status === 200) {
                setFeed(data.feed)
            } else {
                setFeed([])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }
    return { isLoading, fetchCommuneFeed, feed }
}