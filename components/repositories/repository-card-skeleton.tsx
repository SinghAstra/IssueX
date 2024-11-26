import { Skeleton } from "@/components/ui/skeleton";

export function RepositoryCardSkeleton() {
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card min-h-[16rem]">
      <div className="flex justify-between p-4">
        <Skeleton className="h-6 w-[140px]" />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="mt-auto p-4 border-t flex space-x-2">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 flex-grow" />
      </div>
    </div>
  );
}
