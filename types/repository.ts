export interface Repository {
  name: string;
  description: string | null;
  languages: string[];
  stars: number;
  forks: number;
  isConnected: boolean;
  updatedAt: string | null;
  url: string;
  githubId: number;
}
