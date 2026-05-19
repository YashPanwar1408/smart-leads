export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-primary-500 dark:border-zinc-700 ${className ?? ''}`}
    />
  );
};

export const FullPageSpinner = () => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="h-8 w-8" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    </div>
  );
};
