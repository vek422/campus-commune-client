// src/context/SocketContext.tsx
import { BACKEND_BASE_URL } from "@/config/config";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import io from "socket.io-client";

// Initialize the socket
const socket = io(BACKEND_BASE_URL);

socket.on("connect", () => {
  console.log("Connected to socket server");
});
// Define the type of the context value (Socket or null)
const SocketContext = createContext<SocketIOClient.Socket | null>(null);

// Custom hook to use the SocketContext
export const useSocket = () => useContext(SocketContext);

// SocketProvider component that provides the socket to children components
export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Create socket inside provider (using useMemo ensures it's only created once)
  const socketInstance = useMemo(() => socket, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
