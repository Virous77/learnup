import LoginForm from './form';
import AuthUI from '../shared/auth-ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trells | Login',
  description: 'Trells is a alternative and open source version of Trello.',
};

const LoginPage = async () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <AuthUI type="login">
        <LoginForm />
      </AuthUI>
    </main>
  );
};

export default LoginPage;
