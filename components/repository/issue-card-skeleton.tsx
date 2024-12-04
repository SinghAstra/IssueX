import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function IssueCardSkeleton() {
  return (
    <Card className="cursor-pointer">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <Skeleton className="h-4 w-32" />
      </div>
    </Card>
  );
}
