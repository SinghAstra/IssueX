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
    <Card className="bg-[#1a1f37] border-[#2a2f45]">
      <CardHeader className="border-b border-[#2a2f45]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <GitPullRequestIcon className="h-5 w-5 text-[#2d8cf0]" />
            Recent Issues
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-[#2d8cf0]/10 text-[#2d8cf0] border-[#2d8cf0]/20"
          >
            {issues.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#2a2f45]">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-4 hover:bg-[#1e2442] transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div
                  className={cn(
                    "p-2 rounded-full",
                    issue.status === "OPEN"
                      ? "bg-[#ff4d4d]/10"
                      : "bg-[#33b469]/10"
                  )}
                >
                  {issue.status === "OPEN" ? (
                    <AlertCircleIcon className="h-4 w-4 text-[#ff4d4d]" />
                  ) : (
                    <CheckCircleIcon className="h-4 w-4 text-[#33b469]" />
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
                          ? "bg-[#ff4d4d]/10 text-[#ff4d4d] border-[#ff4d4d]/20"
                          : "bg-[#33b469]/10 text-[#33b469] border-[#33b469]/20"
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
                      ? "bg-[#7928ca]/10 text-[#7928ca] border-[#7928ca]/20"
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
