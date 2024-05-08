import { signIn } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icon";
import Link from "next/link";

type TAuth = {
  children: React.ReactNode;
  type: string;
};

const AuthUI: React.FC<TAuth> = ({ children, type }) => {
  const description =
    type === "register"
      ? "Enter your credentials below to create your account"
      : "Enter your credentials below to sign in to your account";
  const title =
    type === "register" ? "Create an account" : "Sign in to your account";

  return (
    <section className="w-[500px]">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <form
              action={async () => {
                "use server";
                await signIn("github", {
                  redirect: true,
                  redirectTo: "/",
                });
              }}
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google", {
                  redirect: true,
                  redirectTo: "/",
                });
              }}
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </form>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {children}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <div className="text-center flex gap-2 items-center">
            <span className="text-muted-foreground text-[14px]">
              {type === "register"
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>
            <Link
              href={type === "register" ? "/login" : "/register"}
              className="text-primary text-[14px] hover:underline hover:underline-offset-4"
            >
              {type === "register" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AuthUI;
