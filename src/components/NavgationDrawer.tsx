import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import NavLink from "./NavLink";
import { NavItems } from "./SidebarNav";
import { logout } from "@/store/reducers/authReducer";
import { ToggleTheme } from "./toggleTheme";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ScrollArea } from "./ui/scroll-area";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { Channel } from "@/store/reducers/CommuneReducer";

const selectChannel = createSelector(
  (state) => state.commune.communes,
  (state) => state.commune.channels,
  (_state, communeId: string) => communeId,
  (communes, channels, communeId) =>
    communes[communeId]?.channels?.map(
      (channelId: string) => channels[channelId]
    )
);
export default function NavigationDrawer() {
  const { communeId = "" } = useParams();
  const channels =
    useAppSelector((state) => selectChannel(state, communeId)) || [];
  const dispatch = useAppDispatch();
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <Menu size={18} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className=" px-5 p-2">
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>Menu</DrawerTitle>
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <ToggleTheme />
            </Button>
          </DrawerHeader>
          <ScrollArea className="h-[70vh]">
            {channels.length ? (
              <div className="flex flex-col px-4">
                <h2 className="text-lg font-semibold ">Channels</h2>
                <div className="flex flex-col">
                  {channels.map((channel: Channel) => (
                    <NavLink
                      key={channel._id}
                      href={`/commune/${communeId}/channel/${channel._id}`}
                    >
                      {channel.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="flex flex-col px-4">
              {/* General Items */}
              <NavItems />
            </div>
            <div className="flex flex-col px-4">
              {/* <Separator /> */}
              <h2 className="text-lg font-semibold ">Others</h2>
              <Button
                className="max-w-min text-destructive active:text-destructive-foreground active:bg-destructive
                hover:bg-destructive hover:text-destructive-foreground"
                variant="ghost"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
