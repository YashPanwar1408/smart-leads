import { Download, Plus, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';

interface LeadToolbarProps {
  search: string;
  sort: 'latest' | 'oldest';
  onSearchChange: (value: string) => void;
  onSortChange: (value: 'latest' | 'oldest') => void;
  onCreate: () => void;
  onExport: () => void;
  exporting: boolean;
}

export const LeadToolbar = ({
  search,
  sort,
  onSearchChange,
  onSortChange,
  onCreate,
  onExport,
  exporting
}: LeadToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:max-w-xs lg:max-w-sm">
          <SearchInput
            hideLabel
            label="Search leads"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="w-full sm:w-40">
          <Select
            label="Sort by"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as 'latest' | 'oldest')}
          >
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={onExport}
          loading={exporting}
          leftIcon={<Download className="h-4 w-4" />}
        >
          Export CSV
        </Button>
        <Button onClick={onCreate} leftIcon={<Plus className="h-4 w-4" />}>
          New Lead
        </Button>
      </div>
    </div>
  );
};

export const LeadToolbarMeta = ({ total }: { total?: number }) => {
  if (total === undefined) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
      <SlidersHorizontal className="h-4 w-4" />
      <span>
        {total} lead{total !== 1 ? 's' : ''} found
      </span>
    </div>
  );
};
