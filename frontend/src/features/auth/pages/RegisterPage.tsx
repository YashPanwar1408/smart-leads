import { Link, useNavigate } from 'react-router-dom';

import { AuthForm } from '../components/AuthForm';
import { AuthFormValues } from '../auth.schemas';
import { useAuth } from '../hooks/useAuth';

export const RegisterPage = () => {
  const { register, registerLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: AuthFormValues) => {
    if (!values.name) return;
    try {
      await register({ name: values.name, email: values.email, password: values.password });
      navigate('/');
    } catch {
      return;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Start tracking leads with your team today
      </p>
      <div className="mt-8">
        <AuthForm mode="register" onSubmit={handleSubmit} isLoading={registerLoading} />
      </div>
      <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Already have an account?{' '}
        <Link
          className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};
