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
        "bg-[#1a1f37] hover:bg-[#1a1f37]/80",
        "border-[#2a2f45] shadow-lg",
        "before:absolute before:inset-0 before:opacity-0",
        "before:transition-opacity hover:before:opacity-100",
        "before:bg-gradient-to-br before:from-[#2d8cf0]/5 before:to-transparent"
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#2d8cf0]/10 text-[#2d8cf0] p-2 rounded-xl">
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
              repository.isActive
                ? "bg-[#33b469]/10 text-[#33b469] border-[#33b469]/20"
                : "bg-muted/10 text-muted-foreground border-muted/20"
            )}
          >
            {repository.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#2a2f45]">
          <div className="flex items-center gap-2">
            <Icons.gitBranchIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              ID: {repository.githubId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.activityLogIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {repository.webhookId ? "Webhook Active" : "No Webhook"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#2a2f45]">
          <Icons.clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>
      </CardContent>
    </Card>
  );
}
