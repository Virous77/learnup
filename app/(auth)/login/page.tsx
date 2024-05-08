import LoginForm from "./form";
import { auth } from "@/auth/auth";
import AuthUI from "../shared/auth-ui";

const LoginPage = async () => {
  const user = await auth();

  console.log(user);

  return (
    <main className=" flex items-center justify-center h-screen">
      <AuthUI type="login">
        <LoginForm />
      </AuthUI>
    </main>
  );
};

export default LoginPage;
