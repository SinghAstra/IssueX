import { Icons } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Repository } from "@prisma/client";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "bg-card hover:bg-card/80",
        "border-border shadow-lg",
        "before:absolute before:inset-0 before:opacity-0",
        "before:transition-opacity hover:before:opacity-100",
        "before:bg-gradient-to-br before:from-primary/5 before:to-transparent"
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <Icons.gitLogo className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {repository.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {repository.fullName}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "px-2.5 py-0.5 text-xs font-semibold",
              repository.connectionStatus
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-muted text-muted-foreground border-muted"
            )}
          >
            {repository.connectionStatus === "CONNECTED"
              ? "Active"
              : "Inactive"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Icons.gitBranch className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              ID: {repository.githubId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.activityLog className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {repository.webhookId ? "Webhook Active" : "No Webhook"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Icons.clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>
      </CardContent>
    </Card>
  );
}
