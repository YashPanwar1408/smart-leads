import { Bell, LogOut, Mail, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { PageTransition } from '@/components/ui/PageTransition';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { formatDate } from '@/utils/format';
import { cn } from '@/utils/classnames';

interface SettingsRowProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsRow = ({ label, description, children, className }: SettingsRowProps) => (
  <motion.div
    layout
    className={cn(
      'flex flex-col gap-3 border-b border-zinc-100 py-5 last:border-0 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between',
      className
    )}
  >
    <div className="min-w-0">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
      {description ? (
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      ) : null}
    </div>
    <motion.div layout className="shrink-0">
      {children}
    </motion.div>
  </motion.div>
);

export const SettingsPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const theme = useUiStore((state) => state.theme);
  const navigate = useNavigate();

  const displayName = user?.name ?? 'User';
  const isAdmin = user?.role === 'admin';

  return (
    <PageTransition>
      <motion.div layout className="space-y-6">
        <PageHeader
          title="Settings"
          description="Manage your profile, preferences, and account."
        />

        <Card>
          <motion.div layout className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar name={displayName} size="lg" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{displayName}</h2>
                <Badge tone={isAdmin ? 'warning' : 'primary'} className="capitalize">
                  {user?.role ?? 'sales'}
                </Badge>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Mail className="h-3.5 w-3.5" />
                {user?.email ?? '—'}
              </p>
              {user?.createdAt ? (
                <p className="mt-2 text-xs text-zinc-400">
                  Member since {formatDate(user.createdAt)}
                </p>
              ) : null}
            </div>
          </motion.div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card padding="none" className="overflow-hidden">
            <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
              <motion.div layout className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Account</h3>
              </motion.div>
            </div>
            <div className="px-6">
              <SettingsRow label="Full name" description="Your display name in the dashboard">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {displayName}
                </span>
              </SettingsRow>
              <SettingsRow label="Email address" description="Used for login and notifications">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                  {user?.email ?? '—'}
                </span>
              </SettingsRow>
              <SettingsRow label="User ID" description="Your unique account identifier">
                <code className="rounded-lg bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {user?.id ? `${user.id.slice(0, 8)}…` : '—'}
                </code>
              </SettingsRow>
            </div>
          </Card>

          <Card padding="none" className="overflow-hidden">
            <motion.div layout className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary-500" />
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Preferences</h3>
              </div>
            </motion.div>
            <motion.div layout className="px-6">
              <SettingsRow
                label="Appearance"
                description={`Currently using ${theme === 'dark' ? 'dark' : 'light'} mode`}
              >
                <ThemeToggle />
              </SettingsRow>
              <SettingsRow
                label="Notifications"
                description="In-app notifications for lead updates"
              >
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-300">
                  Enabled
                </span>
              </SettingsRow>
            </motion.div>
          </Card>
        </div>

        <Card>
          <motion.div layout className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10">
              <Shield className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Role & permissions
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {isAdmin ? (
                  <>
                    As an <strong className="text-zinc-700 dark:text-zinc-200">Admin</strong>, you
                    can view, create, edit, and delete all leads across the organization.
                  </>
                ) : (
                  <>
                    As a <strong className="text-zinc-700 dark:text-zinc-200">Sales</strong> user,
                    you can manage leads you own. Filtering, search, CSV export, and pagination apply
                    to your pipeline.
                  </>
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Create leads', 'Edit leads', 'Delete leads', 'Export CSV', 'Filter & search'].map(
                  (perm) => (
                    <span
                      key={perm}
                      className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {perm}
                    </span>
                  )
                )}
                {isAdmin ? (
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                    All leads access
                  </span>
                ) : null}
              </div>
            </div>
          </motion.div>
        </Card>

        <Card className="border-red-200/60 dark:border-red-500/20">
          <motion.div layout className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.div layout>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Sign out</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                End your current session on this device.
              </p>
            </motion.div>
            <Button
              variant="danger"
              onClick={() => {
                logout();
                navigate('/login');
              }}
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Sign out
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </PageTransition>
  );
};
