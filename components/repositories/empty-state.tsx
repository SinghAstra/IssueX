import { FolderGit2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/50 rounded-lg border-2 border-dashed">
      <FolderGit2 className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No repositories found</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        No repositories match your current filter criteria. Try adjusting your
        filters or check back later.
      </p>
    </div>
  );
}
