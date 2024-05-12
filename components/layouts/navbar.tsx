import Link from "next/link";
import { Separator } from "../ui/separator";
import { auth } from "../../auth/auth";
import ProfileDropdown from "../profile/profile-dropdown";
import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

const Navbar = async () => {
  const session = await auth();
  const email = session?.user?.email!;
  const currentUser = await db.select().from(user).where(eq(user.email, email));

  return (
    <nav className=" w-full fixed top-0 left-0 z-10  backdrop-blur dark:bg-[#0c0a09]/60 group shadow-lg">
      <header className="md:px-16 px-4  py-2">
        <ul className="flex  items-center h-16 justify-between">
          <li>
            <Link
              href="/"
              aria-label="LearnX Home Page"
              className="bg-primary  rounded-[99px] inline-block px-6  py-2 "
            >
              <h1 className="m-0 p-0 h-3 text-[22px] font-bold">LearnX</h1>
              <small className="text-[9px] inline-block  ml-[14px] mt-[11px]">
                Learn and Grow
              </small>
            </Link>
          </li>

          {!session?.user?.email ? (
            <li className=" md:bg-accent md:rounded-[99px] inline-block md:px-6 py-2">
              <div className="bg-primary md:px-4 px-6 md:py-2 py-3 flex items-center gap-5 rounded-[99px]">
                <Link
                  href="/login"
                  className="text-secondary font-[500]"
                  aria-label="Login to your account"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-secondary font-[500]"
                  aria-label="Create a new account"
                >
                  Sign Up
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
      <Separator className="w-full hidden group-hover:flex" />
    </nav>
  );
};

export default Navbar;
