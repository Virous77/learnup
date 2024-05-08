import RegisterForm from "./form";
import AuthUI from "../shared/auth-ui";

const RegisterPage = () => {
  return (
    <main className=" flex items-center justify-center h-screen">
      <AuthUI type="register">
        <RegisterForm />
      </AuthUI>
    </main>
  );
};

export default RegisterPage;
