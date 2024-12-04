import { FilterBarSkeleton } from "../repositories/filter-bar-skeleton";
import { IssueCardSkeleton } from "./issue-card-skeleton";

export function IssuesListSkeleton() {
  return (
    <div className="space-y-4">
      <FilterBarSkeleton />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <IssueCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
