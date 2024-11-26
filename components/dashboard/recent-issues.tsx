import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Issue } from "@prisma/client";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  GitPullRequestIcon,
} from "lucide-react";

interface RecentIssuesProps {
  issues: Issue[];
}

export function RecentIssues({ issues }: RecentIssuesProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <GitPullRequestIcon className="h-5 w-5 text-primary" />
            Recent Issues
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {issues.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div
                  className={cn(
                    "p-2 rounded-full",
                    issue.status === "OPEN"
                      ? "bg-destructive/10"
                      : "bg-emerald-500/10"
                  )}
                >
                  {issue.status === "OPEN" ? (
                    <AlertCircleIcon className="h-4 w-4 text-destructive" />
                  ) : (
                    <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                  )}
                </div>

                {/* Issue Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#{issue.githubIssueId}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        issue.status === "OPEN"
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      )}
                    >
                      {issue.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {issue.aiSuggestion}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    issue.aiAnalyzed
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-muted/10 text-muted-foreground border-muted/20"
                  )}
                >
                  {issue.aiAnalyzed ? "AI Analyzed" : "Pending Analysis"}
                </Badge>
                <span className="text-sm text-muted-foreground"></span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
