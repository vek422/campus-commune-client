import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { LoaderCircle } from "lucide-react";
interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}
export const LoadingButton: FC<LoadingButtonProps> = ({
  type,
  variant,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={props.className}
      disabled={props.isLoading}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
      ) : (
        props.children
      )}
    </Button>
  );
};
