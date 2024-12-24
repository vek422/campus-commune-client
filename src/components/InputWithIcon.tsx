import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function InputWithIcon({
  placeholder,
  value,
  onChange,
  onSubmit,
  Icon,
}: {
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  Icon: typeof Search;
}) {
  return (
    <div className="relative flex items-center w-full">
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 h-full px-2"
        onClick={onSubmit}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </div>
  );
}
