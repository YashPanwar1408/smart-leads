import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
        <Sparkles className="h-8 w-8 text-white" />
      </div>
      <h1 className="mt-6 text-6xl font-bold text-zinc-900 dark:text-zinc-50">404</h1>
      <p className="mt-3 text-lg font-medium text-zinc-700 dark:text-zinc-300">Page not found</p>
      <p className="mt-2 max-w-sm text-center text-sm text-zinc-500 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button className="mt-8" asChild leftIcon={<Home className="h-4 w-4" />}>
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
};
