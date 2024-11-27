import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react"

const extractPermissions = (permissions: any) => {
    let communePermissions: string[] = [];
    let channelPermissions: string[] = [];
    if (permissions?.commune) {
        communePermissions = Object.values(permissions.commune).filter(permission => typeof permission === "string")
        if (permissions.commune?.channel) {
            channelPermissions = Object.values(permissions.commune.channel)
        }
    }
    return {
        communePermissions,
        channelPermissions
    }
}

export const useFetchCommunePermissions = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.auth)
    const [communePermissions, setCommunePermissions] = useState<string[]>([])
    const [channelPermissions, setChannelPermissions] = useState<string[]>([])
    const fetchCommunePermissions = async () => {

        try {
            setIsLoading(true)
            const { data, status } = await axios.get(`${BACKEND_BASE_URL}/commune/permissions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (status === 200) {
                const { communePermissions, channelPermissions } = extractPermissions(data.permission);
                setChannelPermissions(channelPermissions);
                setCommunePermissions(communePermissions)
            }

        } catch (err: any) {
            console.log(err)
        } finally {
            setIsLoading(true)
        }
    }
    useEffect(() => {
        fetchCommunePermissions();
    }, [])

    return { isLoading, fetchCommunePermissions, communePermissions, channelPermissions }
}