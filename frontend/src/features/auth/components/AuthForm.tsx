import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AuthFormValues, loginSchema, registerSchema } from '../auth.schemas';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
}

export const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const schema = mode === 'login' ? loginSchema : registerSchema;
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(mode === 'register' ? { name: '' } : {})
    }
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {mode === 'register' ? (
        <Input
          label="Full name"
          placeholder="Jane Cooper"
          {...form.register('name')}
          error={form.formState.errors.name?.message}
        />
      ) : null}
      <Input
        label="Email address"
        type="email"
        placeholder="you@company.com"
        {...form.register('email')}
        error={form.formState.errors.email?.message}
      />
      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Minimum 8 characters"
        {...form.register('password')}
        error={form.formState.errors.password?.message}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
      <Button type="submit" className="w-full" size="lg" loading={isLoading}>
        {mode === 'login' ? 'Sign in' : 'Create account'}
      </Button>
    </form>
  );
};
