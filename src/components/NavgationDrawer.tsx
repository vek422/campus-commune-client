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
import { useAppDispatch } from "@/store/store";

export default function NavigationDrawer() {
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
  );
}
