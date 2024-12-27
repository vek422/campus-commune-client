import { FC } from "react";
import { Logo } from "./logo";
import { ToggleTheme } from "./toggleTheme";
import Profile from "./profile";
import NavigationDrawer from "./NavgationDrawer";
export const Topbar: FC = () => {
  return (
    <div className="h-12 p-4 flex items-center justify-between w-full fixed top-0 backdrop-blur-sm gap-2">
      <Logo />
      <div className="md:flex items-center gap-4 hidden">
        <Profile />
        <ToggleTheme />
      </div>
      <NavigationDrawer />
    </div>
  );
};
