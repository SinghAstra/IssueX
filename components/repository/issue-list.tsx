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
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FilterBar } from "../repositories/filter-bar";

interface Issue {
  id: string;
  title: string;
  issueType: IssueType;
  status: IssueStatus;
  createdAt: Date;
  body: string | null;
}

interface IssuesListProps {
  issues: Issue[];
  onIssueClick: (issueId: string) => void;
  searchQuery: string;
}

const issueTypeIcons = {
  BUG: Bug,
  FEATURE: GitPullRequest,
  IMPROVEMENT: Lightbulb,
  OTHER: MoreHorizontal,
};

export function IssuesList({
  issues,
  onIssueClick,
  searchQuery = "",
}: IssuesListProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues);
  const filters = ["All", "Open", "Closed"];

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    let result = issues;

    if (activeFilter === "Open") {
      result = result.filter((issue) => issue.status === "OPEN");
    } else if (activeFilter === "Closed") {
      result = result.filter((issue) => issue.status === "CLOSED");
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(lowercaseQuery) ||
          (issue.body && issue.body.toLowerCase().includes(lowercaseQuery))
      );
    }

    setFilteredIssues(result);
  }, [issues, activeFilter, searchQuery]);

  return (
    <div className="space-y-4">
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilter={handleFilter}
      />
      <div className="space-y-2">
        {filteredIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onClick={onIssueClick} />
        ))}
        {filteredIssues.length === 0 && (
          <div className="text-center text-gray-500">No issues found.</div>
        )}
      </div>
    </div>
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
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold mb-4" {...props} />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-semibold mb-3" {...props} />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-semibold mb-2" {...props} />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 mb-4" {...props} />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 mb-4" {...props} />
                    ),
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    a: ({ node, ...props }) => (
                      <a
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {issue.body}
                </ReactMarkdown>
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
