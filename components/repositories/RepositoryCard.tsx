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

export function RepositoryCard({ repo }: { repo: Repository }) {
  const statusColor = repo.isConnected ? "text-green-500" : "text-gray-400";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Circle className={`h-4 w-4 ${statusColor}`} />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {repo.name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {repo.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>{repo.organization}</span>
        <span className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          {repo.forks}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {repo.language}
          </span>
        </div>
        <button
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            repo.isConnected
              ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {repo.isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </div>
  );
}
