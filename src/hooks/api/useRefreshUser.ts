import { BACKEND_BASE_URL } from "@/config/config"
import { updateUser } from "@/store/reducers/authReducer"
import { useAppDispatch, useAppSelector } from "@/store/store"
import axios from "axios"
import { useEffect, useState } from "react"

export const useRefreshUser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { token } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const refreshUser = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BACKEND_BASE_URL}/user/get-user-info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(updateUser(response.data.user))
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        refreshUser()
    }, [])
    return { isLoading, error, refreshUser }
}