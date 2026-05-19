import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Contact,
  Plus,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  UserX
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Card } from '@/components/ui/Card';
import { DashboardCard, DashboardCardGrid } from '@/components/ui/DashboardCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { PageTransition } from '@/components/ui/PageTransition';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { useDashboardStats } from '@/features/leads/hooks/useDashboardStats';
import { useLeads } from '@/features/leads/hooks/useLeads';
import { formatDate } from '@/utils/format';
import { Avatar } from '@/components/ui/Avatar';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

export const DashboardPage = () => {
  const stats = useDashboardStats();
  const { data: recentLeads, isLoading: leadsLoading } = useLeads({ limit: 5, sort: 'latest' });

  const conversionRate =
    stats.total > 0 ? Math.round((stats.qualified / stats.total) * 100) : 0;

  return (
    <PageTransition>
      <div className="space-y-8">
        <PageHeader
          title="Dashboard"
          description="Overview of your lead pipeline and recent activity."
          actions={
            <Button asChild leftIcon={<Plus className="h-4 w-4" />}>
              <Link to="/leads">Add Lead</Link>
            </Button>
          }
        />

        <DashboardCardGrid>
          <DashboardCard
            title="Total Leads"
            value={stats.total}
            icon={Users}
            gradient="indigo"
            loading={stats.isLoading}
            trend={{ value: 12, label: 'vs last month' }}
          />
          <DashboardCard
            title="New Leads"
            value={stats.new}
            icon={UserPlus}
            gradient="blue"
            loading={stats.isLoading}
            trend={{ value: 8, label: 'this week' }}
          />
          <DashboardCard
            title="Qualified"
            value={stats.qualified}
            icon={Target}
            gradient="green"
            loading={stats.isLoading}
            trend={{ value: conversionRate, label: 'conversion' }}
          />
          <DashboardCard
            title="Contacted"
            value={stats.contacted}
            icon={Contact}
            gradient="orange"
            loading={stats.isLoading}
          />
          <DashboardCard
            title="Lost"
            value={stats.lost}
            icon={UserX}
            gradient="red"
            loading={stats.isLoading}
            trend={{ value: -3, label: 'vs last month' }}
          />
        </DashboardCardGrid>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2" padding="none">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
              <div>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Recent Leads
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Latest additions to your pipeline</p>
              </div>
              <Button variant="ghost" size="sm" asChild rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link to="/leads">View all</Link>
              </Button>
            </div>
            {leadsLoading ? (
              <div className="p-6">
                <SkeletonLoader rows={4} />
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentLeads?.items.map((lead, index) => (
                  <motion.div
                    key={lead._id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/leads/${lead._id}`}
                      className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                    >
                      <Avatar name={lead.name} size="md" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {lead.name}
                        </p>
                        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{lead.email}</p>
                      </div>
                      <StatusBadge status={lead.status} />
                      <span className="hidden text-xs text-zinc-400 sm:block">
                        {formatDate(lead.createdAt)}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                {!recentLeads?.items.length ? (
                  <div className="px-6 py-12 text-center text-sm text-zinc-500">
                    No leads yet.{' '}
                    <Link to="/leads" className="font-medium text-primary-600 hover:underline">
                      Add your first lead
                    </Link>
                  </div>
                ) : null}
              </div>
            )}
          </Card>

          <Card>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Pipeline Health
                </h2>
                <p className="text-xs text-zinc-500">Quick insights</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Conversion Rate', value: `${conversionRate}%`, color: 'bg-green-500' },
                {
                  label: 'Contact Rate',
                  value: stats.total > 0 ? `${Math.round((stats.contacted / stats.total) * 100)}%` : '0%',
                  color: 'bg-orange-500'
                },
                {
                  label: 'Loss Rate',
                  value: stats.total > 0 ? `${Math.round((stats.lost / stats.total) * 100)}%` : '0%',
                  color: 'bg-red-500'
                }
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">{metric.label}</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{metric.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <motion.div
                      className={`h-full rounded-full ${metric.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: metric.value }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full" asChild>
              <Link to="/leads">View all leads</Link>
            </Button>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};
