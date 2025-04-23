import AuthCheck from '@/components/auth/AuthCheck';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthCheck redirectPath="/profile">
      <LoginForm />
    </AuthCheck>
  );
};

export default LoginPage;
