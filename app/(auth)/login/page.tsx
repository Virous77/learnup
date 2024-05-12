import LoginForm from "./form";
import AuthUI from "../shared/auth-ui";

const LoginPage = async () => {
  return (
    <main className=" flex items-center justify-center h-screen">
      <AuthUI type="login">
        <LoginForm />
      </AuthUI>
    </main>
  );
};

export default LoginPage;
