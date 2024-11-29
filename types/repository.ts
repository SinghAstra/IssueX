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
