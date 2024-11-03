import { RouterProvider } from "react-router-dom";
import { router } from "./router.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { useSocket } from "./hooks/useSocket.ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addThreadFront, addThreads } from "./store/reducers/CommuneReducer.ts";
export default function App() {
  const { socket, isConnected, error } = useSocket();
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("new-thread", (thread, communeId) => {
      console.log(`New thread in commune ${communeId}:`, thread);
      dispatch(addThreadFront(thread));
    });
  }, [socket]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
