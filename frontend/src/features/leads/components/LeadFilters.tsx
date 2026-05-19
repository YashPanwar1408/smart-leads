import { LeadSource, LeadStatus } from '@/types/lead';
import { Input } from '@/components/ui/Input';
import {
  ActiveFilterTag,
  FilterBadge,
  FilterBar,
  FilterGroup
} from '@/components/ui/FilterBar';

interface LeadFiltersProps {
  status: LeadStatus[];
  source: LeadSource[];
  createdAtFrom?: string;
  createdAtTo?: string;
  onStatusChange: (value: LeadStatus[]) => void;
  onSourceChange: (value: LeadSource[]) => void;
  onDateChange: (from?: string, to?: string) => void;
  onClear: () => void;
}

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Lost'];
const sourceOptions: LeadSource[] = ['Website', 'Instagram', 'Referral'];

export const LeadFilters = ({
  status,
  source,
  createdAtFrom,
  createdAtTo,
  onStatusChange,
  onSourceChange,
  onDateChange,
  onClear
}: LeadFiltersProps) => {
  const activeCount =
    status.length + source.length + (createdAtFrom ? 1 : 0) + (createdAtTo ? 1 : 0);

  const toggleStatus = (value: LeadStatus) => {
    onStatusChange(
      status.includes(value) ? status.filter((item) => item !== value) : [...status, value]
    );
  };

  const toggleSource = (value: LeadSource) => {
    onSourceChange(
      source.includes(value) ? source.filter((item) => item !== value) : [...source, value]
    );
  };

  return (
    <FilterBar activeCount={activeCount} onClear={onClear}>
      <div className="grid gap-5 lg:grid-cols-2">
        <FilterGroup label="Status">
          {statusOptions.map((item) => (
            <FilterBadge
              key={item}
              label={item}
              active={status.includes(item)}
              onClick={() => toggleStatus(item)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Source">
          {sourceOptions.map((item) => (
            <FilterBadge
              key={item}
              label={item}
              active={source.includes(item)}
              onClick={() => toggleSource(item)}
              color="accent"
            />
          ))}
        </FilterGroup>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input
          label="Created from"
          type="date"
          value={createdAtFrom ?? ''}
          onChange={(event) => onDateChange(event.target.value || undefined, createdAtTo)}
        />
        <Input
          label="Created to"
          type="date"
          value={createdAtTo ?? ''}
          onChange={(event) => onDateChange(createdAtFrom, event.target.value || undefined)}
        />
      </div>

      {activeCount > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-zinc-200/80 pt-4 dark:border-zinc-700/80">
          {status.map((s) => (
            <ActiveFilterTag key={s} label={s} onRemove={() => toggleStatus(s)} />
          ))}
          {source.map((s) => (
            <ActiveFilterTag key={s} label={s} onRemove={() => toggleSource(s)} />
          ))}
          {createdAtFrom ? (
            <ActiveFilterTag label={`From ${createdAtFrom}`} onRemove={() => onDateChange(undefined, createdAtTo)} />
          ) : null}
          {createdAtTo ? (
            <ActiveFilterTag label={`To ${createdAtTo}`} onRemove={() => onDateChange(createdAtFrom, undefined)} />
          ) : null}
        </div>
      ) : null}
    </FilterBar>
  );
};
