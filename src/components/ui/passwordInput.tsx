/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
const PasswordInput = ({ field }: { field: any }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="password"
        {...field}
      />
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute inset-y-0 right-0 flex items-center  rounded-full justify-center  "
        onClick={togglePasswordVisibility}
        type="button"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
