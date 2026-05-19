import { TableSkeleton } from '@/components/ui/SkeletonLoader';

export const LeadTableSkeleton = () => {
  return <TableSkeleton columns={5} rows={8} />;
};
