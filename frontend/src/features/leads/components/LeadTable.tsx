import { ColumnDef, VisibilityState, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Columns3, Eye, Pencil, Trash2 } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { DataTable } from '@/components/ui/Table';
import { IconButton } from '@/components/ui/IconButton';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Lead, LeadSource } from '@/types/lead';
import { formatDate } from '@/utils/format';
import { cn } from '@/utils/classnames';
import { DropdownMenu, DropdownItem } from '@/components/ui/DropdownMenu';

interface LeadTableProps {
  data: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onSelect: (lead: Lead) => void;
  onView: (lead: Lead) => void;
}

const sourceStyles: Record<LeadSource, string> = {
  Website: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
  Instagram: 'bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300',
  Referral: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300'
};

export const LeadTable = ({ data, onEdit, onDelete, onSelect, onView }: LeadTableProps) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<Lead>[] = [
    {
      id: 'lead',
      header: 'Lead',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.original.name} size="md" />
          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">{row.original.name}</p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{row.original.email}</p>
          </div>
        </div>
      ),
      enableHiding: true
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      enableHiding: true
    },
    {
      id: 'source',
      header: 'Source',
      cell: ({ row }) => (
        <span
          className={cn(
            'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
            sourceStyles[row.original.source]
          )}
        >
          {row.original.source}
        </span>
      ),
      enableHiding: true
    },
    {
      id: 'created',
      header: 'Created',
      cell: ({ row }) => (
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(row.original.createdAt)}
        </span>
      ),
      enableHiding: true
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="action-cell flex items-center justify-end gap-0.5 opacity-0 transition-opacity duration-150">
          <IconButton
            icon={<Eye className="h-4 w-4" />}
            label="View lead"
            variant="primary"
            onClick={(event) => {
              event.stopPropagation();
              onView(row.original);
            }}
          />
          <IconButton
            icon={<Pencil className="h-4 w-4" />}
            label="Edit lead"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(row.original);
            }}
          />
          <IconButton
            icon={<Trash2 className="h-4 w-4" />}
            label="Delete lead"
            variant="danger"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(row.original);
            }}
          />
        </div>
      ),
      enableHiding: false
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={onSelect}
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
      renderToolbar={(table) => <ColumnToggleMenu table={table} />}
    />
  );
};

const columnLabels: Record<string, string> = {
  lead: 'Lead',
  status: 'Status',
  source: 'Source',
  created: 'Created'
};

const ColumnToggleMenu = ({ table }: { table: ReturnType<typeof useReactTable<Lead>> }) => {
  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide());

  return (
    <DropdownMenu
      trigger={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Columns3 className="h-3.5 w-3.5" />
          Columns
        </button>
      }
    >
      {columns.map((column) => (
        <label
          key={column.id}
          className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <input
            type="checkbox"
            checked={column.getIsVisible()}
            onChange={column.getToggleVisibilityHandler()}
            className="h-3.5 w-3.5 rounded border-zinc-300 text-primary-600 focus:ring-primary-500"
          />
          {columnLabels[column.id] ?? column.id}
        </label>
      ))}
    </DropdownMenu>
  );
};
