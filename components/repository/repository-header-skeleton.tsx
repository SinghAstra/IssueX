import { Skeleton } from "../ui/skeleton";

export function RepositoryHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between p-6 border-b border animate-pulse">
      <div className="flex items-center space-x-1">
        <Skeleton className="h-6 w-[140px]" />
        <Skeleton className="h-6 w-[140px]" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-8" />
      </div>
    </div>
  );
}
