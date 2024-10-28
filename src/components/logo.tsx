import { FC } from "react";
import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import { useTheme } from "./theme-provider";
export const Logo: FC = () => {
  const { theme } = useTheme();
  return (
    <div className="w-full h-min  flex items-center gap-2 ">
      <img
        src={theme == "dark" ? logoDark : logoLight}
        alt="campus commune"
        className="w-8 h-8"
      />
      <h1 className="font-bold text-xl sm:text-lg md:text-2xl">
        campus commune
      </h1>
    </div>
  );
};
