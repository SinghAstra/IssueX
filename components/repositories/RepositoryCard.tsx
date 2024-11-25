import { Circle, GitFork, Star } from "lucide-react";
import React from "react";

interface Repository {
  name: string;
  description: string;
  organization: string;
  language: string;
  stars: number;
  forks: number;
  isConnected: boolean;
  lastUpdated: string;
}

const getLanguageColor = (language: string) => {
  switch (language.toLowerCase()) {
    case "typescript":
      return "bg-[hsl(var(--repo-language-ts))]";
    case "go":
      return "bg-[hsl(var(--repo-language-go))]";
    case "rust":
      return "bg-[hsl(var(--repo-language-rust))]";
    default:
      return "bg-primary";
  }
};

export function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <div
      className="bg-card rounded-[--radius] p-6 shadow-md hover:shadow-lg transition-all 
      border border-border hover:bg-[hsl(var(--repo-hover))] group backdrop-blur-3xl"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Circle
              className={`h-4 w-4 ${
                repo.isConnected
                  ? "text-[hsl(var(--repo-connected))]"
                  : "text-muted-foreground"
              }`}
            />
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-[hsl(var(--primary))]">
              {repo.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {repo.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="group-hover:text-foreground transition-colors">
          {repo.organization}
        </span>
        <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
          <Star className="h-4 w-4" />
          {repo.stars.toLocaleString()}
        </span>
        <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
          <GitFork className="h-4 w-4" />
          {repo.forks.toLocaleString()}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getLanguageColor(
              repo.language
            )}`}
          ></div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            {repo.language}
          </span>
        </div>
        <button
          className={`px-4 py-1.5 rounded-[--radius] text-sm font-medium transition-all ${
            repo.isConnected
              ? "bg-green-400 text-black hover:bg-green-400/80"
              : "bg-[hsl(var(--primary))] hover:opacity-90 text-primary-foreground"
          }`}
        >
          {repo.isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}
