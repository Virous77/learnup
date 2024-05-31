import { fallBackName } from '@/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { IUser } from '@/db/schema';
import { signOut } from '@/auth/auth';
import { Button } from '../ui/button';

type TProfile = {
  user: IUser;
};

const ProfileDropdown: React.FC<TProfile> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user.image || ''}
            alt={user.name || ''}
            aria-label="user profile picture"
          />
          <AvatarFallback>{fallBackName(user.name || '')}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[250px] px-0 pb-0 pt-3"
        side="bottom"
        sideOffset={12}
        align="end"
      >
        <div className="flex flex-col items-start px-3 text-[14px]">
          <p>{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuGroup className="mt-4 px-0">
          <DropdownMenuItem className="cursor-pointer rounded-[0] px-0 text-muted-foreground">
            <Link
              href="/profile"
              className="flex w-full items-center justify-between px-3"
              aria-label="Account Settings"
            >
              <p>Account Settings</p>
              <Settings size={18} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer rounded-[0] px-0 text-muted-foreground">
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
              className="w-full px-3"
              aria-label="Logout"
            >
              <Button
                type="submit"
                variant="ghost"
                className="h-fit w-full justify-start p-0"
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
