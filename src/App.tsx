import { RouterProvider } from "react-router-dom";
import { router } from "./router.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { useSocket } from "./hooks/useSocket.ts";
import { useEffect } from "react";
export default function App() {
  const { socket, isConnected, error } = useSocket();
  useEffect(() => {
    socket?.on("new-thread", (thread, communeId) => {
      console.log(`New thread in commune ${communeId}:`, thread);
    });
  }, [socket]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
