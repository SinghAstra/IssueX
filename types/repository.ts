import { Repository as PrismaRepository } from "@prisma/client";

export interface ExtendedRepository extends PrismaRepository {
  githubCreatedAt?: Date;
  githubUpdatedAt?: Date;
}
export interface Repository {
  id: string | number;
  name: string;
  fullName: string;
  description: string | null;
  languages: string[];
  stars: number;
  forks: number;
  connectionStatus: ConnectionStatus;
  updatedAt: string | null;
  url: string;
  githubId: number;
  githubCreatedAt?: Date;
  githubUpdatedAt?: Date;
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
