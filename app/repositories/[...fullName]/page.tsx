"use client";
import {
  getRepositoryDetails,
  getRepositoryIssues,
} from "@/app/actions/repositories";
import { Issue, IssueDialog } from "@/components/repository/issue-dialog";
import { IssuesList } from "@/components/repository/issue-list";
import { RepositoryHeader } from "@/components/repository/repository-header";
import { RepositorySidebar } from "@/components/repository/repository-sidebar";
import { ExtendedRepository } from "@/types/repository";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RepositoryDetailPage() {
  const params = useParams();
  const repoFullName = (params.fullName as string[]).join("/");
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>();
  const [repository, setRepository] = useState<ExtendedRepository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function fetchRepositoryDetails() {
      try {
        const data = await getRepositoryDetails(repoFullName);
        setRepository(data);

        const fetchedIssues = await getRepositoryIssues(repoFullName);
        setIssues(fetchedIssues);
      } catch (error) {
        console.log("Failed to fetch repository details", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepositoryDetails();
  }, [repoFullName]);

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
          createdAt={repository.githubCreatedAt!}
          updatedAt={repository.githubUpdatedAt!}
          repoUrl={repository.htmlUrl}
        />

        <div className="flex-1">
          <div className="p-6">
            <IssuesList
              issues={issues}
              onIssueClick={(id) =>
                setSelectedIssue(issues.find((issue) => issue.id === id))
              }
              searchQuery=""
            />
          </div>

          {/* <RepositoryAnalytics issues={mockIssues} /> */}
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
