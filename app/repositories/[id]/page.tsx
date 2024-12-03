"use client";
import { IssueDialog } from "@/components/repository/issue-dialog";
import { IssuesList } from "@/components/repository/issue-list";
import { RepositoryAnalytics } from "@/components/repository/repository-analytics";
import { RepositoryHeader } from "@/components/repository/repository-header";
import { RepositorySidebar } from "@/components/repository/repository-sidebar";
import { ConnectionStatus, IssueStatus, IssueType } from "@prisma/client";
import { useState } from "react";

const mockRepository = {
  id: "1",
  name: "awesome-project",
  fullName: "user/awesome-project",
  connectionStatus: "CONNECTED" as ConnectionStatus,
  description: "A really awesome project with lots of cool features",
  htmlUrl: "https://github.com/user/awesome-project",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-03-15"),
};

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

function App() {
  const [selectedIssue, setSelectedIssue] = useState<
    (typeof mockIssues)[0] | undefined
  >();

  return (
    <div className="min-h-screen bg-background lg:pl-64">
      <RepositoryHeader
        name={mockRepository.name}
        connectionStatus={mockRepository.connectionStatus}
        htmlUrl={mockRepository.htmlUrl}
        onSync={() => console.log("Syncing...")}
      />

      <div className="flex">
        <RepositorySidebar
          description={mockRepository.description}
          createdAt={mockRepository.createdAt}
          updatedAt={mockRepository.updatedAt}
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

export default App;
