import { BACKEND_BASE_URL } from "@/config/config"
import { Thread } from "@/store/reducers/CommuneReducer"
import { useAppSelector } from "@/store/store"
import axios from "axios"
import { useState } from "react"

export const useFetchThread = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [thread, setThread] = useState<Thread>()
    const { token } = useAppSelector(state => state.auth)
    console.log(thread)
    const fetchThread = async (threadId: string) => {
        try {
            setIsLoading(true)
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/thread/${threadId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status === 200) {
                setThread(data.thread)
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    return { thread, fetchThread, isLoading }
}