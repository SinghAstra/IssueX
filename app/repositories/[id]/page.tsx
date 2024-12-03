"use client";
import { getRepositoryDetails } from "@/app/actions/github-repositories";
import { IssueDialog } from "@/components/repository/issue-dialog";
import { IssuesList } from "@/components/repository/issue-list";
import { RepositoryAnalytics } from "@/components/repository/repository-analytics";
import { RepositoryHeader } from "@/components/repository/repository-header";
import { RepositorySidebar } from "@/components/repository/repository-sidebar";
import { IssueStatus, IssueType, Repository } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const mockIssues = [
  {
    id: "1",
    title: "Fix navigation bug",
    body: "The navigation menu doesn't work properly on mobile devices",
    issueType: "BUG" as IssueType,
    status: "OPEN" as IssueStatus,
    createdAt: new Date("2024-03-01"),
    comments: [
      {
        id: "1",
        body: "I can reproduce this on iPhone 12",
        isAiGenerated: false,
        createdAt: new Date("2024-03-02"),
      },
      {
        id: "2",
        body: "Based on the description, this appears to be related to the touch event handling...",
        isAiGenerated: true,
        createdAt: new Date("2024-03-03"),
      },
    ],
  },
];

function RepositoryDetailPage() {
  const params = useParams();
  const repositoryId = params.id as string;
  const [selectedIssue, setSelectedIssue] = useState<
    (typeof mockIssues)[0] | undefined
  >();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRepositoryDetails() {
      try {
        const data = await getRepositoryDetails(repositoryId);
        console.log("data is ", data);
        setRepository(data);
      } catch (error) {
        console.log("Failed to fetch repository details", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositoryDetails();
  }, [repositoryId]);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (!repository)
    return <div className="text-white">Repository not found</div>;

  return (
    <div className="min-h-screen bg-background lg:pl-64">
      <RepositoryHeader
        name={repository.name}
        connectionStatus={repository.connectionStatus}
        htmlUrl={repository.htmlUrl ?? undefined}
        onSync={() => console.log("Syncing...")}
      />

      <div className="flex">
        <RepositorySidebar
          description={repository.description ?? undefined}
          createdAt={repository.createdAt}
          updatedAt={repository.updatedAt}
        />

        <div className="flex-1">
          <div className="p-6">
            <IssuesList
              issues={mockIssues}
              onIssueClick={(id) =>
                setSelectedIssue(mockIssues.find((issue) => issue.id === id))
              }
            />
          </div>

          <RepositoryAnalytics issues={mockIssues} />
        </div>
      </div>

      <IssueDialog
        issue={selectedIssue}
        onClose={() => setSelectedIssue(undefined)}
        onGenerateAiResponse={(issueId) =>
          console.log("Generating AI response for issue:", issueId)
        }
      />
    </div>
  );
}

export default RepositoryDetailPage;
