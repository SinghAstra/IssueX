"use client";

import { FilterBar } from "@/components/repositories/FilterBar";
import { RepositoryCard } from "@/components/repositories/RepositoryCard";
import React, { useState } from "react";

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

function RepositoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-6">
      <FilterBar onFilter={setActiveFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  );
}

export default RepositoryPage;
