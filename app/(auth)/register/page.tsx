import RegisterForm from './form';
import AuthUI from '../shared/auth-ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trells | Register',
  description: 'Trells is a alternative and open source version of Trello.',
};

const RegisterPage = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <AuthUI type="register">
        <RegisterForm />
      </AuthUI>
    </main>
  );
};

export default RegisterPage;
