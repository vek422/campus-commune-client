/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import axios from "axios";
import { useState } from "react"
import { useToast } from "../use-toast";

export const useCreateThread = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [thread, setThread] = useState(null);
    const [error, setError] = useState(null);

    const { toast } = useToast();
    const { token, user } = useAppSelector(state => state.auth)
    const createThread = async (values: { channelId: string, title: string, communeId: string, images?: FileList, content: string }) => {
        if (!values) return;
        setIsLoading(true);
        try {
            const formData = new FormData();

            formData.append('channelId', values.channelId)
            formData.append('title', values.title)
            formData.append('content', values.content)
            formData.append('createdBy', user?._id || "")
            formData.append('communeId', values.communeId)

            if (values?.images)
                for (const image of values?.images) {
                    formData.append('images', image)
                }

            const imagesUri: string[] = [];
            if (values?.images)
                for (const image of values?.images)
                    imagesUri.push(image.name)

            imagesUri.forEach((image, index) => {
                formData.append(`imagesUri[${index}]`, image);
            })

            const { data } = await axios.postForm(`${BACKEND_BASE_URL}/thread`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            //set thread
            setThread(data)
            //show toast
            toast({
                title: "Thread created successfully"
            })

            //update the store
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        error,
        thread,
        isLoading,
        createThread
    }
}