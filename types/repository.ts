export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  languages: string[];
  stars: number;
  forks: number;
  connectionStatus: string;
  updatedAt: string | null;
  url: string;
  githubId: number;
}

export type ConnectionStatus = "CONNECTED" | "NOT_CONNECTED";

export enum IssueType {
  BUG = "BUG",
  FEATURE = "FEATURE",
  IMPROVEMENT = "IMPROVEMENT",
  OTHER = "OTHER",
}

export enum IssueStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}
