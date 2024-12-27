import { RouterProvider } from "react-router-dom";
import { router } from "./router.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { useSocket } from "./context/SocketContext.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addThreadFront,
  removeThread,
  Thread,
} from "./store/reducers/CommuneReducer.ts";
import { useAppSelector } from "./store/store.ts";
import { useRefreshUser } from "./hooks/api/useRefreshUser.ts";
import { LogoLoading } from "./components/LogoLoading.tsx";
import { useToast } from "./hooks/use-toast.ts";
import { User } from "./store/reducers/authReducer.ts";
export default function App() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const communesIds = useAppSelector((state) =>
    Object.keys(state.commune.communes)
  );
  const { isLoading } = useRefreshUser();
  const user = useAppSelector((state) => state.auth.user);
  const { toast } = useToast();
  useEffect(() => {
    if (socket?.connected) {
      socket?.on("new-thread", (thread: Thread, communeId: string) => {
        console.log(`New thread in commune ${communeId}:`, thread);
        const user = thread.createdBy as User;
        toast({
          title: `${user?.firstName} just posted a new thread`,
          description: `${thread.title}`,
        });
        dispatch(addThreadFront(thread));
      });
      socket?.on(
        "deleted-thread",
        (threadId: string, channelId: string, communeId: string) => {
          console.log(`Thread ${threadId} deleted in commune ${communeId}`);
          dispatch(removeThread({ threadId, channelId }));
        }
      );
      socket.emit("join-rooms", communesIds, user?._id);
    }
    return () => {
      socket?.emit("leave-rooms", communesIds, user?._id);
      socket?.off("new-thread");
    };
  }, [socket?.connected, communesIds, user?._id]);

  if (user && isLoading) {
    return <LogoLoading />;
  }
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}
