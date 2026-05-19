import { Bell, Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserMenu } from '@/components/layout/UserMenu';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/utils/classnames';

interface NavbarProps {
  title?: string;
  subtitle?: string;
}

export const Navbar = ({ title, subtitle }: NavbarProps) => {
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('search') as string;
    if (query?.trim()) {
      navigate(`/leads?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/leads');
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 md:hidden dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {title ? (
          <div className="hidden lg:block">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
            {subtitle ? (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
            ) : null}
          </div>
        ) : null}

        <form onSubmit={handleSearch} className="relative hidden flex-1 sm:block sm:max-w-md lg:max-w-sm xl:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            name="search"
            type="search"
            placeholder="Search leads..."
            className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-50/80 pl-9 pr-4 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100 dark:focus:border-primary-400 dark:focus:bg-zinc-900"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className={cn(
              'relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            )}
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
