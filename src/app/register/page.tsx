import AuthCheck from '@/components/auth/AuthCheck';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthCheck redirectPath="/profile">
      <RegisterForm />
    </AuthCheck>
  );
};

export default RegisterPage;
