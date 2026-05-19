import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { RoleGate } from '@/app/guards/RoleGate';
import { SidebarUserProfile } from '@/components/layout/UserMenu';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/utils/classnames';

const navItems = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Leads', to: '/leads', icon: Users },
  { label: 'Settings', to: '/settings', icon: Settings }
];

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader = ({ collapsed, onToggle }: SidebarHeaderProps) => {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Expand sidebar"
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-lg',
            'border border-zinc-700/80 bg-zinc-900 text-zinc-400',
            'transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200'
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-3">
        <motion.div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
          <Sparkles className="h-4 w-4 text-white" />
        </motion.div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">Smart Leads</p>
          <p className="text-[11px] text-zinc-500">Dashboard</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-label="Collapse sidebar"
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          'border border-zinc-700/80 bg-zinc-900 text-zinc-400',
          'transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200'
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
};

interface SidebarContentProps {
  collapsed?: boolean;
  onNavigate?: () => void;
  onToggle?: () => void;
}

const SidebarContent = ({ collapsed = false, onNavigate, onToggle }: SidebarContentProps) => {
  const location = useLocation();

  return (
    <>
      {onToggle ? <SidebarHeader collapsed={collapsed} onToggle={onToggle} /> : null}

      <nav className={cn('flex flex-col gap-1', onToggle ? 'mt-6' : 'mt-8')}>
        {navItems.map(({ label, to, icon: Icon }) => {
          const isActive =
            to === '/'
              ? location.pathname === '/'
              : location.pathname === to || location.pathname.startsWith(`${to}/`);

          return (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'text-white'
                  : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
              )}
            >
              {isActive ? (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary-500/10 ring-1 ring-primary-500/30"
                  transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                />
              ) : null}
              <Icon
                className={cn(
                  'relative h-4 w-4 shrink-0 transition-colors',
                  isActive ? 'text-primary-400' : 'text-zinc-500 group-hover:text-zinc-300'
                )}
              />
              {!collapsed ? <span className="relative">{label}</span> : null}
              {isActive && !collapsed ? (
                <span className="relative ml-auto h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              ) : null}
            </NavLink>
          );
        })}
      </nav>

      <RoleGate allowed={['admin']}>
        {!collapsed ? (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs font-semibold text-amber-400">Admin Access</p>
            <p className="mt-0.5 text-[11px] text-zinc-500">View and manage all leads</p>
          </div>
        ) : null}
      </RoleGate>

      <SidebarUserProfile collapsed={collapsed} />
    </>
  );
};

export const Sidebar = () => {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);

  return (
    <>
      <aside
        className={cn(
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-zinc-800/60 bg-zinc-950 py-6 shadow-sidebar transition-[width] duration-300 md:flex',
          sidebarOpen ? 'w-64 px-4' : 'w-[72px] px-3'
        )}
      >
        <SidebarContent collapsed={!sidebarOpen} onToggle={toggleSidebar} />
      </aside>

      <AnimatePresence>
        {mobileSidebarOpen ? (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-zinc-900/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-800/60 bg-zinc-950 px-4 py-6 md:hidden"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            >
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent onNavigate={() => setMobileSidebarOpen(false)} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
