import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  OnChangeFn
} from '@tanstack/react-table';
import { ReactNode } from 'react';

import { cn } from '@/utils/classnames';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  onRowClick?: (row: TData) => void;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  renderToolbar?: (table: ReturnType<typeof useReactTable<TData>>) => ReactNode;
  emptyMessage?: string;
}

export const DataTable = <TData,>({
  data,
  columns,
  onRowClick,
  columnVisibility,
  onColumnVisibilityChange,
  renderToolbar,
  emptyMessage = 'No data available'
}: DataTableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    state: columnVisibility ? { columnVisibility } : {},
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="space-y-3">
      {renderToolbar ? (
        <div className="flex items-center justify-end">{renderToolbar(table)}</div>
      ) : null}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 shadow-card dark:border-zinc-800/80">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="sticky top-0 z-10 bg-zinc-50/95 backdrop-blur-sm dark:bg-zinc-900/95">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-zinc-100 bg-white dark:divide-zinc-800/80 dark:bg-zinc-900/50">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'group transition-colors duration-150 [&:hover_.action-cell]:opacity-100',
                      onRowClick && 'cursor-pointer hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40'
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3.5 text-sm text-zinc-700 dark:text-zinc-200"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export type { VisibilityState };
