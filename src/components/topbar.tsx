import { FC } from "react";
import { Logo } from "./logo";
import { ToggleTheme } from "./toggleTheme";
import Profile from "./profile";
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
import { useAppDispatch } from "@/store/store";
export const Topbar: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="h-12 p-4 flex items-center justify-between w-full fixed top-0 backdrop-blur-sm gap-2">
      <Logo />
      <div className="md:flex items-center gap-4 hidden">
        <Profile />
        <ToggleTheme />
      </div>
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
            <div className="flex flex-col px-4">
              {/* General Items */}
              <NavItems />
            </div>
            <div className="flex flex-col px-4">
              {/* <Separator /> */}
              <h2 className="text-lg font-semibold ">Settings</h2>
              <NavLink href="/settings">Settings</NavLink>
              <Button
                className="max-w-min text-destructive active:text-destructive-foreground active:bg-destructive
                hover:bg-destructive hover:text-destructive-foreground"
                variant="ghost"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
