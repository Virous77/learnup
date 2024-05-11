import { fallBackName } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Settings } from "lucide-react";
import { IUser } from "@/db/schema";
import { signOut } from "@/auth/auth";
import { Button } from "../ui/button";

type TProfile = {
  user: IUser;
};

const ProfileDropdown: React.FC<TProfile> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user.image || ""}
            alt={user.name || ""}
            aria-label="user profile picture"
          />
          <AvatarFallback>{fallBackName(user.name || "")}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] px-0 pt-3 pb-0"
        side="bottom"
        sideOffset={12}
        align="end"
      >
        <div className=" flex flex-col items-start text-[14px]  px-3">
          <p>{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuGroup className=" mt-4 px-0">
          <DropdownMenuItem className="px-0 rounded-[0] text-muted-foreground cursor-pointer">
            <Link
              href="/profile"
              className=" flex items-center justify-between px-3 w-full"
            >
              <p>Account Settings</p>
              <Settings size={18} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-0 rounded-[0]  text-muted-foreground cursor-pointer">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="px-3 w-full"
            >
              <Button
                type="submit"
                variant="ghost"
                className="p-0 h-fit w-full justify-start"
              >
                Logout
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
