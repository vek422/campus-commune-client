import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { LoaderCircle } from "lucide-react";
interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}
export const LoadingButton: FC<LoadingButtonProps> = ({
  type,
  variant,
  isLoading = false,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={props.className}
      disabled={isLoading}
      onClick={props.onClick}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
      ) : (
        props.children
      )}
    </Button>
  );
};
