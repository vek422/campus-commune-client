import { cn } from "@/lib/utils";
import { FC } from "react";

interface flexProps {
  children: React.ReactNode;
  className?: string;
}
export const Flex: FC<flexProps> = ({ children, className }) => {
  return <div className={cn(["flex"], className)}>{children}</div>;
};
