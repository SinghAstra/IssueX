"use client";

import { FilterBar } from "@/components/repositories/filter-bar";
import { FilterBarSkeleton } from "@/components/repositories/filter-bar-skeleton";
import { RepositoryCard } from "@/components/repositories/repository-card";
import { RepositoryCardSkeleton } from "@/components/repositories/repository-card-skeleton";
import { Repository } from "@/types/repository";
import React, { useEffect, useState } from "react";
import { fetchGithubRepositories } from "../actions/github-repositories";

function RepositoryPage() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredRepositories, setFilteredRepositories] = useState<
    Repository[]
  >([]);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const fetchedRepos = await fetchGithubRepositories();
        console.log("fetchedRepos is ", fetchedRepos);
        setRepositories(fetchedRepos);
        setFilteredRepositories(fetchedRepos);
      } catch (error) {
        console.log("Failed to fetch repositories", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);

    switch (filter) {
      case "Connected":
        setFilteredRepositories(
          repositories.filter((repo) => repo.isConnected)
        );
        break;
      case "Not Connected":
        setFilteredRepositories(
          repositories.filter((repo) => !repo.isConnected)
        );
        break;
      default:
        setFilteredRepositories(repositories);
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-6">
        <FilterBarSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RepositoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-6">
      <FilterBar activeFilter={activeFilter} onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
      </div>
      {filteredRepositories.length === 0 && (
        <div className="text-center text-gray-500">No repositories found.</div>
      )}
    </div>
  );
}

export default RepositoryPage;
