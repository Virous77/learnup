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
import RegisterForm from "./form";
import Link from "next/link";
import { signIn } from "@/auth/auth";

const RegisterPage = () => {
  return (
    <main className=" flex items-center justify-center h-screen">
      <section className="w-[500px]">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your credentials below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Github
              </Button>
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
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <div className="text-center flex gap-2 items-center">
              <span className="text-muted-foreground text-[14px]">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="text-primary text-[14px] hover:underline hover:underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default RegisterPage;
