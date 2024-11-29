import { useState } from "react";
import { useToast } from "../use-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useAppSelector } from "@/store/store";
import { addChannel, addChannels } from "@/store/reducers/CommuneReducer";
import { BACKEND_BASE_URL } from "@/config/config";

export const useCreateChannel = (communeId: string) => {
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const { token } = useAppSelector(state => state.auth)
    const dispatch = useDispatch()

    const createChannel = async (channelName: string, handleClose: () => void) => {
        setIsLoading(true);
        try {
            const { data, status } = await axios.post(`${BACKEND_BASE_URL}/commune/${communeId}/add-channel`, {
                channelName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status === 200) {
                try {
                    dispatch(addChannel({ channel: data.channel, communeId: communeId }))
                    console.log(data.channel)

                } catch (r) {
                    console.log(r)
                }
                toast({
                    title: "Channel created",
                });
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Failed to create channel",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false);
            handleClose()
        }
    }
    return {
        isLoading,
        createChannel
    }
}