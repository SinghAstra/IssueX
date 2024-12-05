"use client";
import {
  getRepositoryDetails,
  getRepositoryIssues,
} from "@/app/actions/repositories";
import { IssueDialog } from "@/components/repository/issue-dialog";
import { IssuesList } from "@/components/repository/issue-list";
import { IssuesListSkeleton } from "@/components/repository/issue-list-skeleton";
import { RepositoryHeader } from "@/components/repository/repository-header";
import { RepositoryHeaderSkeleton } from "@/components/repository/repository-header-skeleton";
import { RepositorySidebar } from "@/components/repository/repository-sidebar";
import { RepositorySidebarSkeleton } from "@/components/repository/repository-sidebar-skeleton";
import { ExtendedRepository } from "@/types/repository";
import { Issue } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RepositoryDetailPage() {
  const params = useParams();
  const repoFullName = (params.fullName as string[]).join("/");
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>();
  const [repository, setRepository] = useState<ExtendedRepository | null>(null);
  const [isRepositoryLoading, setIsRepositoryLoading] = useState(true);
  const [isIssuesLoading, setIsIssuesLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function fetchRepositoryDetails() {
      try {
        setIsRepositoryLoading(true);
        const data = await getRepositoryDetails(repoFullName);
        setRepository(data);
      } catch (error) {
        console.error(
          "Failed to fetch repository details --fetchRepositoryDetails",
          error
        );
        setRepository(null);
      } finally {
        setIsRepositoryLoading(false);
      }
    }

    fetchRepositoryDetails();
  }, [repoFullName]);

  useEffect(() => {
    async function fetchRepositoryIssues() {
      try {
        setIsIssuesLoading(true);
        const fetchedIssues = await getRepositoryIssues(repoFullName);
        console.log("fetchedIssues is ", fetchedIssues);
        setIssues(fetchedIssues);
      } catch (error) {
        console.error("Failed to fetch repository issues", error);
        setIssues([]);
      } finally {
        setIsIssuesLoading(false);
      }
    }

    fetchRepositoryIssues();
  }, [repoFullName]);

  return (
    <div className="min-h-screen bg-background lg:pl-64">
      {isRepositoryLoading ? (
        <RepositoryHeaderSkeleton />
      ) : (
        repository && (
          <RepositoryHeader
            name={repository.name}
            connectionStatus={repository.connectionStatus}
            htmlUrl={repository.htmlUrl ?? undefined}
            // onSync={() => console.log("Syncing...")}
          />
        )
      )}

      <div className="flex">
        {isRepositoryLoading ? (
          <RepositorySidebarSkeleton />
        ) : (
          repository && (
            <RepositorySidebar
              description={repository.description ?? undefined}
              createdAt={repository.githubCreatedAt!}
              updatedAt={repository.githubUpdatedAt!}
              repoUrl={repository.htmlUrl}
            />
          )
        )}

        <div className="flex-1">
          <div className="p-6">
            {isIssuesLoading ? (
              <IssuesListSkeleton />
            ) : (
              <IssuesList
                issues={issues}
                onIssueClick={(id) =>
                  setSelectedIssue(issues.find((issue) => issue.id === id))
                }
                searchQuery=""
              />
            )}
          </div>

          {/* <RepositoryAnalytics issues={mockIssues} /> */}
        </div>
      </div>

      <IssueDialog
        issue={selectedIssue}
        onClose={() => setSelectedIssue(undefined)}
      />
    </div>
  );
}

export default RepositoryDetailPage;
