import logoLight from "../assets/logoLight.svg";
import logoDark from "../assets/logoDark.svg";
import { useTheme } from "./theme-provider";
export const LogoLoading = () => {
  const { theme } = useTheme();
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-5 animate-pulse">
      <img
        src={theme == "dark" ? logoDark : logoLight}
        alt="campus commune"
        className={"w-10 h-10"}
      />
      <h1 className="">Campus Commune</h1>
    </div>
  );
};
