import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Globe,
  Mail,
  Pencil,
  Trash2,
  User
} from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { PageTransition } from '@/components/ui/PageTransition';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/data/EmptyState';
import { ErrorState } from '@/components/data/ErrorState';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { LeadFormModal } from '../components/LeadFormModal';
import { useLead } from '../hooks/useLeads';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useLeadMutations } from '../hooks/useLeadMutations';
import { formatDate } from '@/utils/format';
import { cn } from '@/utils/classnames';
import { LeadSource } from '@/types/lead';

const sourceIcons: Record<LeadSource, typeof Globe> = {
  Website: Globe,
  Instagram: Globe,
  Referral: User
};

export const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useLead(id ?? '');
  const { open, onOpen, onClose } = useDisclosure();
  const {
    open: deleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const { deleteLead } = useLeadMutations();

  if (isLoading) {
    return (
      <PageTransition>
        <Card>
          <SkeletonLoader rows={6} />
        </Card>
      </PageTransition>
    );
  }

  if (isError) {
    return (
      <ErrorState description="Failed to load lead details." onRetry={() => void refetch()} />
    );
  }

  if (!data) {
    return (
      <EmptyState
        title="Lead not found"
        description="This lead may have been removed or the link is invalid."
        actionLabel="Back to leads"
        onAction={() => navigate('/leads')}
      />
    );
  }

  const SourceIcon = sourceIcons[data.source];

  const handleDelete = async () => {
    try {
      await deleteLead.mutateAsync(data._id);
      navigate('/leads');
    } catch {
      return;
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/leads')}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to leads
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onOpen} leftIcon={<Pencil className="h-4 w-4" />}>
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={onDeleteOpen}
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar name={data.name} size="lg" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{data.name}</h1>
                <StatusBadge status={data.status} />
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{data.email}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Mail, label: 'Email', value: data.email },
            { icon: SourceIcon, label: 'Source', value: data.source },
            { icon: Calendar, label: 'Created', value: formatDate(data.createdAt) },
            { icon: Calendar, label: 'Last updated', value: formatDate(data.updatedAt) }
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} padding="sm" hover>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">{label}</p>
                  <p className={cn('mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100')}>
                    {value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <LeadFormModal
          open={open}
          mode="edit"
          leadId={data._id}
          initialValues={{
            name: data.name,
            email: data.email,
            status: data.status,
            source: data.source
          }}
          onClose={onClose}
        />

        <ConfirmDialog
          open={deleteOpen}
          title="Delete lead"
          description={`Are you sure you want to delete "${data.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={() => void handleDelete()}
          onClose={onDeleteClose}
          loading={deleteLead.isPending}
        />
      </div>
    </PageTransition>
  );
};
