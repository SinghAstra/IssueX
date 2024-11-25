import { Issue, Repository } from "@prisma/client";

export const mockRepositories: Repository[] = [
  {
    id: "1",
    userId: "1",
    name: "project-alpha",
    fullName: "user/project-alpha",
    githubId: 123456,
    isActive: true,
    webhookId: "webhook-1",
    createdAt: new Date("2024-03-20T10:00:00Z"),
    updatedAt: new Date("2024-03-20T10:00:00Z"),
  },
  {
    id: "2",
    userId: "2",
    name: "project-beta",
    fullName: "user/project-beta",
    githubId: 123457,
    isActive: true,
    webhookId: "webhook-2",
    createdAt: new Date("2024-03-19T10:00:00Z"),
    updatedAt: new Date("2024-03-19T10:00:00Z"),
  },
];

export const mockIssues: Issue[] = [
  {
    id: "1",
    githubIssueId: 1,
    repositoryId: "1",
    status: "OPEN",
    aiAnalyzed: true,
    aiSuggestion: "Consider updating the dependencies",
    createdAt: new Date("2024-03-19T10:00:00Z"),
    updatedAt: new Date("2024-03-19T10:00:00Z"),
  },
  {
    id: "2",
    githubIssueId: 2,
    repositoryId: "1",
    status: "CLOSED",
    aiAnalyzed: true,
    aiSuggestion: "Bug fixed in PR #123",
    createdAt: new Date("2024-03-19T10:00:00Z"),
    updatedAt: new Date("2024-03-19T10:00:00Z"),
  },
];

export const mockStats: DashboardStats = {
  totalRepositories: 2,
  activeRepositories: 2,
  totalIssues: 10,
  openIssues: 5,
  aiAnalyzedIssues: 8,
};

export interface DashboardStats {
  totalRepositories: number;
  activeRepositories: number;
  totalIssues: number;
  openIssues: number;
  aiAnalyzedIssues: number;
}
