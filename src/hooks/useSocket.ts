/* eslint-disable @typescript-eslint/no-explicit-any */

import { BACKEND_BASE_URL } from "@/config/config";
import { useAppSelector } from "@/store/store";
import { useEffect, useRef, useState } from "react"
import * as io from "socket.io-client"
import { Socket } from "socket.io-client"
export const useSocket = () => {
    const { user } = useAppSelector(state => state.auth)
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const socketRef = useRef<typeof Socket | null>(null);
    // const stableOptions = useMemo(() => options, [options])

    useEffect(() => {
        if (!user) return;
        socketRef.current = io(BACKEND_BASE_URL);

        socketRef.current?.on("connect", () => {
            setIsConnected(true)
        })

        socketRef.current?.on("disconnect", () => {
            setIsConnected(false)
        })


        socketRef.current?.on("connect_error", (e: any) => {
            setIsConnected(false)
            console.log("Error while connecting to the socket")
            setError(e.message)
        })

        socketRef.current?.on("message", (e: any) => {
            console.log("Message received : ", e)
        })



        const userCommunes = user?.communes;
        if (user?.communes?.length > 0)
            socketRef.current?.emit('join-rooms', userCommunes, user?._id);

        return () => {
            socketRef.current?.emit('leave-rooms', userCommunes, user._id,)
            socketRef.current?.off("connect")
            socketRef.current?.off("disconnect")
            socketRef.current?.off("connect_error")
            socketRef.current?.off("message")
            socketRef.current?.disconnect()
            setIsConnected(false);
        }

    }, [user])


    return { socket: socketRef.current, isConnected, error }

}