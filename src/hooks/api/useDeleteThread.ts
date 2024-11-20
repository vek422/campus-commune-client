import { BACKEND_BASE_URL } from "@/config/config";
import { removeThread } from "@/store/reducers/CommuneReducer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react"
import { useToast } from "../use-toast";

export const useDeleteThread = ({ channelId, communeId }: { channelId: string, communeId: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const deleteThread = async (threadId: string) => {
        setIsLoading(true);
        try {
            const { status } = await axios.delete(`${BACKEND_BASE_URL}/thread/${threadId}`, {
                params: {
                    communeId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (status === 200) {
                //dispatch action to remove thread from store
                dispatch(removeThread({ threadId, channelId }));
                toast({
                    title: "success",
                    description: "Thread Deleted",
                })

            }
        } catch (err) {
            console.log(err.message);
            toast({
                title: "Failed to delete thread",
                status: "error",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false);
        }
    }
    return {
        isLoading,
        deleteThread
    }
}