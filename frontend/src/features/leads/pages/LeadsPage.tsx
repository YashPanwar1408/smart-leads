import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Info, Users } from 'lucide-react';

import { RoleGate } from '@/app/guards/RoleGate';

import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { PageHeader } from '@/components/ui/PageHeader';
import { PageTransition } from '@/components/ui/PageTransition';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/data/EmptyState';
import { ErrorState } from '@/components/data/ErrorState';
import { useDebounce } from '@/hooks/useDebounce';
import { Lead, LeadListParams, LeadSource, LeadStatus } from '@/types/lead';
import { downloadBlob } from '@/utils/download';
import { leadsService } from '@/services/leads';

import { LeadFilters } from '../components/LeadFilters';
import { LeadFormModal } from '../components/LeadFormModal';
import { LeadTable } from '../components/LeadTable';
import { LeadTableSkeleton } from '../components/LeadTableSkeleton';
import { LeadToolbar, LeadToolbarMeta } from '../components/LeadToolbar';
import { useLeads } from '../hooks/useLeads';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useLeadMutations } from '../hooks/useLeadMutations';

const toIso = (value?: string): string | undefined => {
  if (!value) return undefined;
  return new Date(value).toISOString();
};

const buildParams = (params: LeadListParams): LeadListParams => {
  return {
    ...params,
    status:
      Array.isArray(params.status) && params.status.length ? params.status.join(',') : undefined,
    source:
      Array.isArray(params.source) && params.source.length ? params.source.join(',') : undefined,
    q: params.q && params.q.length > 0 ? params.q : undefined,
    createdAtFrom: toIso(params.createdAtFrom),
    createdAtTo: toIso(params.createdAtTo)
  };
};

export const LeadsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') ?? '';

  const [status, setStatus] = useState<LeadStatus[]>([]);
  const [source, setSource] = useState<LeadSource[]>([]);
  const [createdAtFrom, setCreatedAtFrom] = useState<string | undefined>();
  const [createdAtTo, setCreatedAtTo] = useState<string | undefined>();
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 400);

  const params = useMemo(
    () =>
      buildParams({
        status,
        source,
        q: debouncedSearch,
        sort,
        page,
        limit: 10,
        createdAtFrom,
        createdAtTo
      }),
    [status, source, debouncedSearch, sort, page, createdAtFrom, createdAtTo]
  );

  const { data, isLoading, isError, refetch } = useLeads(params);
  const { open, onOpen, onClose } = useDisclosure();
  const {
    open: deleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure();
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const navigate = useNavigate();
  const { deleteLead } = useLeadMutations();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await leadsService.exportCsv(params);
      downloadBlob(blob, 'leads.csv');
      toast.success('CSV exported successfully');
    } catch {
      toast.error('Failed to export CSV');
    } finally {
      setExporting(false);
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    onOpen();
  };

  const handleDeleteRequest = (lead: Lead) => {
    setDeletingLead(lead);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingLead) return;
    try {
      await deleteLead.mutateAsync(deletingLead._id);
      onDeleteClose();
      setDeletingLead(null);
    } catch {
      return;
    }
  };

  const handleCreate = () => {
    setEditingLead(null);
    onOpen();
  };

  const handleDateChange = (from?: string, to?: string) => {
    setCreatedAtFrom(from);
    setCreatedAtTo(to);
    setPage(1);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Leads"
          description="Track prospects, filter your pipeline, and manage every lead."
        />

        <RoleGate allowed={['sales']}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 rounded-xl border border-blue-200/80 bg-blue-50/50 px-4 py-3 dark:border-blue-500/20 dark:bg-blue-500/5"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              As a sales user, you see and manage only your own leads. Admins can access all leads in
              the organization.
            </p>
          </motion.div>
        </RoleGate>

        <Card className="space-y-6">
          <LeadToolbar
            search={search}
            sort={sort}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onSortChange={setSort}
            onCreate={handleCreate}
            onExport={handleExport}
            exporting={exporting}
          />

          <LeadFilters
            status={status}
            source={source}
            createdAtFrom={createdAtFrom}
            createdAtTo={createdAtTo}
            onStatusChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            onSourceChange={(value) => {
              setSource(value);
              setPage(1);
            }}
            onDateChange={handleDateChange}
            onClear={() => {
              setStatus([]);
              setSource([]);
              setCreatedAtFrom(undefined);
              setCreatedAtTo(undefined);
              setPage(1);
            }}
          />

          {!isLoading && !isError && data ? (
            <LeadToolbarMeta total={data.pagination?.total} />
          ) : null}

          {isLoading ? <LeadTableSkeleton /> : null}
          {isError ? (
            <ErrorState description="We couldn't load your leads." onRetry={() => void refetch()} />
          ) : null}
          {!isLoading && !isError && data?.items.length === 0 ? (
            <EmptyState
              title="No leads found"
              description="Add your first lead or adjust the filters to see results."
              actionLabel="Add lead"
              onAction={handleCreate}
              icon={Users}
            />
          ) : null}
          {!isLoading && !isError && data && data.items.length > 0 ? (
            <LeadTable
              data={data.items}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              onSelect={(lead) => navigate(`/leads/${lead._id}`)}
              onView={(lead) => navigate(`/leads/${lead._id}`)}
            />
          ) : null}

          {data?.pagination ? (
            <Pagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              total={data.pagination.total}
              onPageChange={setPage}
            />
          ) : null}
        </Card>

        <LeadFormModal
          open={open}
          mode={editingLead ? 'edit' : 'create'}
          initialValues={
            editingLead
              ? {
                  name: editingLead.name,
                  email: editingLead.email,
                  status: editingLead.status,
                  source: editingLead.source
                }
              : undefined
          }
          leadId={editingLead?._id}
          onClose={onClose}
        />

        <ConfirmDialog
          open={deleteOpen}
          title="Delete lead"
          description={`Are you sure you want to delete "${deletingLead?.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={() => void handleDeleteConfirm()}
          onClose={onDeleteClose}
          loading={deleteLead.isPending}
        />
      </div>
    </PageTransition>
  );
};
