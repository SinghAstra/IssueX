import { Skeleton } from "../ui/skeleton";

export function RepositorySidebarSkeleton() {
  return (
    <aside className="w-80 border-r border-border p-6 space-y-6 animate-pulse">
      <section>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-5 w-5"></Skeleton>
          <Skeleton className="h-6 w-16"></Skeleton>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full"></Skeleton>
          <Skeleton className="h-4 w-3/4"></Skeleton>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5"></Skeleton>
            <Skeleton className="h-4 w-16"></Skeleton>
          </div>
          <Skeleton className="h-4 w-12 "></Skeleton>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5"></Skeleton>
            <Skeleton className="h-4 w-16"></Skeleton>
          </div>
          <Skeleton className="h-4 w-12"></Skeleton>
        </div>
      </section>

      <section>
        <Skeleton className="h-4 w-20 mb-3"></Skeleton>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-6 w-16"></Skeleton>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-700"></div>

      <section className="space-y-4">
        <div className="flex items-start gap-2">
          <Skeleton className="h-4 w-4 mt-0.5"></Skeleton>
          <div className="space-y-3 flex-1">
            <div>
              <Skeleton className="h-4 w-16 mb-1"></Skeleton>
              <Skeleton className="h-4 w-24"></Skeleton>
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1"></Skeleton>
              <Skeleton className="h-4 w-24"></Skeleton>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
