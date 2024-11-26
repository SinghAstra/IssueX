import { Skeleton } from "@/components/ui/skeleton";

export function FilterBarSkeleton() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <div className="flex gap-2 items-center py-2 px-1">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    </div>
  );
}
