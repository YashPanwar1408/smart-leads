import { Link, useNavigate } from 'react-router-dom';

import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { AuthFormValues } from '../auth.schemas';

export const LoginPage = () => {
  const { login, loginLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      await login({ email: values.email, password: values.password });
      navigate('/');
    } catch {
      return;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Sign in to your Smart Leads account
      </p>
      <div className="mt-8">
        <AuthForm mode="login" onSubmit={handleSubmit} isLoading={loginLoading} />
      </div>
      <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Don&apos;t have an account?{' '}
        <Link
          className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          to="/register"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};
