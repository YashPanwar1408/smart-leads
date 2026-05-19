import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/ui/Avatar';
import { DropdownDivider, DropdownItem, DropdownMenu } from '@/components/ui/DropdownMenu';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/utils/classnames';

interface UserMenuProps {
  className?: string;
}

export const UserMenu = ({ className }: UserMenuProps) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const displayName = user?.name ?? 'User';
  const role = user?.role ?? 'sales';

  return (
    <DropdownMenu
      className={className}
      closeOnClick
      trigger={
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-2 py-1.5 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        >
          <Avatar name={displayName} size="sm" />
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">
              {displayName}
            </p>
            <p className="mt-0.5 text-xs capitalize text-zinc-500 dark:text-zinc-400">{role}</p>
          </div>
        </button>
      }
    >
      <div className="border-b border-zinc-100 px-3 py-2.5 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{displayName}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email}</p>
      </div>
      <DropdownItem icon={<User className="h-4 w-4" />} onClick={() => navigate('/settings')}>
        Profile
      </DropdownItem>
      <DropdownItem icon={<Settings className="h-4 w-4" />} onClick={() => navigate('/settings')}>
        Settings
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={<LogOut className="h-4 w-4" />} onClick={logout} destructive>
        Sign out
      </DropdownItem>
    </DropdownMenu>
  );
};

interface SidebarUserProfileProps {
  collapsed?: boolean;
}

export const SidebarUserProfile = ({ collapsed }: SidebarUserProfileProps) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const displayName = user?.name ?? 'User';

  return (
    <div
      className={cn(
        'mt-auto border-t border-zinc-800/60 pt-4',
        collapsed ? 'flex justify-center' : ''
      )}
    >
      <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
        <Avatar name={displayName} size="sm" />
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-100">{displayName}</p>
            <p className="truncate text-xs capitalize text-zinc-500">{user?.role ?? 'sales'}</p>
          </div>
        ) : null}
        {!collapsed ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};
