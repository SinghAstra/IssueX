"use client";

import { Icons } from "@/components/Icons";
import { FilterBar } from "@/components/repositories/Filterbar";
import { RepositoryCard } from "@/components/repositories/RepositoryCard";
import { SearchBar } from "@/components/repositories/Searchbar";
import React, { useState } from "react";

// Mock data
const repositories = [
  {
    name: "issue-tracker",
    description: "A modern issue tracking system built with React and Node.js",
    organization: "acme-org",
    language: "TypeScript",
    stars: 128,
    forks: 23,
    isConnected: true,
    lastUpdated: "2024-03-15",
  },
  {
    name: "api-gateway",
    description: "High-performance API gateway with built-in authentication",
    organization: "acme-org",
    language: "Go",
    stars: 342,
    forks: 56,
    isConnected: false,
    lastUpdated: "2024-03-14",
  },
  {
    name: "design-system",
    description: "Component library and design system for web applications",
    organization: "personal",
    language: "TypeScript",
    stars: 89,
    forks: 12,
    isConnected: true,
    lastUpdated: "2024-03-13",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Icons.gitLogo className="h-8 w-8 text-gray-900 dark:text-white" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            GitHub Repositories
          </h1>
        </div>

        <div className="space-y-6">
          <SearchBar onSearch={setSearchQuery} />
          <FilterBar onFilter={setActiveFilter} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <RepositoryCard key={repo.name} repo={repo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
