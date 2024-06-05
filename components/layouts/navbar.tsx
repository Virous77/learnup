import Link from 'next/link';
import { Separator } from '../ui/separator';
import { auth } from '../../auth/auth';
import ProfileDropdown from '../profile/profile-dropdown';
import db from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

const Navbar = async () => {
  const session = await auth();
  const email = session?.user?.email!;
  const currentUser = await db.select().from(user).where(eq(user.email, email));

  return (
    <nav className="group fixed left-0 top-0 z-10 w-full shadow-lg backdrop-blur dark:bg-[#0c0a09]/60">
      <header className="px-4 py-2 md:px-16">
        <ul className="flex h-16 items-center justify-between">
          <li>
            <Link
              href="/"
              aria-label="Trells Home Page"
              className="inline-block rounded-[99px] bg-primary px-6 py-2"
            >
              <h1 className="m-0 h-3 p-0 text-[22px] font-bold">Trells</h1>
              <small className="ml-[14px] mt-[11px] inline-block text-[9px]">
                Manage Tasks
              </small>
            </Link>
          </li>

          {!session?.user?.email ? (
            <li className="inline-block py-2 md:rounded-[99px] md:bg-accent md:px-4">
              <div className="flex items-center gap-5 rounded-[99px] bg-primary px-6 py-3 md:px-4 md:py-2">
                <Link
                  href="/login"
                  className="font-[500] hover:underline hover:underline-offset-4"
                  aria-label="Login to your account"
                >
                  Login
                </Link>
              </div>
            </li>
          ) : (
            <li className="w-fit cursor-pointer">
              <ProfileDropdown user={currentUser[0]} />
            </li>
          )}
        </ul>
      </header>
      <Separator className="hidden w-full group-hover:flex" />
    </nav>
  );
};

export default Navbar;
