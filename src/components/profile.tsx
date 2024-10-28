import { useAppDispatch, useAppSelector } from "@/store/store";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/store/reducers/authReducer";
import { LogOut } from "lucide-react";
export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <Avatar>
            <AvatarFallback>
              {`${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Hi {user?.firstName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => dispatch(logout())}
        >
          <LogOut />
          <p>Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
