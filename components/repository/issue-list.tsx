import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IssueStatus, IssueType } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Bug, GitPullRequest, Lightbulb, MoreHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Issue {
  id: string;
  title: string;
  issueType: IssueType;
  status: IssueStatus;
  createdAt: Date;
  body?: string;
}

interface IssuesListProps {
  issues: Issue[];
  onIssueClick: (issueId: string) => void;
}

const issueTypeIcons = {
  BUG: Bug,
  FEATURE: GitPullRequest,
  IMPROVEMENT: Lightbulb,
  OTHER: MoreHorizontal,
};

export function IssuesList({ issues, onIssueClick }: IssuesListProps) {
  const openIssues = issues.filter((issue) => issue.status === "OPEN");
  const closedIssues = issues.filter((issue) => issue.status === "CLOSED");

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Issues ({issues.length})</TabsTrigger>
        <TabsTrigger value="open">Open ({openIssues.length})</TabsTrigger>
        <TabsTrigger value="closed">Closed ({closedIssues.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onClick={onIssueClick} />
        ))}
      </TabsContent>

      <TabsContent value="open" className="space-y-4">
        {openIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onClick={onIssueClick} />
        ))}
      </TabsContent>

      <TabsContent value="closed" className="space-y-4">
        {closedIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onClick={onIssueClick} />
        ))}
      </TabsContent>
    </Tabs>
  );
}

function IssueCard({
  issue,
  onClick,
}: {
  issue: Issue;
  onClick: (id: string) => void;
}) {
  const Icon = issueTypeIcons[issue.issueType];

  return (
    <Card
      className="cursor-pointer transition-all hover:bg-accent"
      onClick={() => onClick(issue.id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" />
                {issue.title}
              </div>
            </CardTitle>
            {issue.body && (
              <CardDescription className="line-clamp-2">
                {issue.body}
              </CardDescription>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={issue.status === "OPEN" ? "default" : "secondary"}>
              {issue.status.toLowerCase()}
            </Badge>
            <Badge variant="outline">{issue.issueType}</Badge>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Created {formatDistanceToNow(issue.createdAt, { addSuffix: true })}
        </div>
      </CardHeader>
    </Card>
  );
}
