
import { useAppSelector } from "@/store/store";
import { useEffect, useMemo, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
export const useSocket = ({ url, options = {}, communeId }: { url: string, options?: object, communeId: string }) => {
    const { user } = useAppSelector(state => state.auth)
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null)
    const socketRef = useRef<Socket | null>(null);
    const stableOptions = useMemo(() => options, [options])
    useEffect(() => {
        socketRef.current = io(url, stableOptions);

        socketRef.current?.on("connect", () => {
            setIsConnected(true)
        })

        socketRef.current?.on("disconnect", () => {
            setIsConnected(false)
        })


        socketRef.current?.on("connect_error", (e) => {
            setIsConnected(false)
            console.log("Error while connecting to the socket")
            setError(e.message)
        })

        socketRef.current?.on("message", (e) => {
            console.log("Message received : ", e)
        })

        socketRef.current?.emit("joinRoom", communeId, user._id)
        return () => {
            socketRef.current?.disconnect()
        }

    }, [])


    return { socket: socketRef.current, isConnected, error }

}