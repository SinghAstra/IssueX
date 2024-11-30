"use client";

import { Header } from "@/components/layout/header";
import { useSearch } from "@/components/providers/search-provider";
import { FilterBar } from "@/components/repositories/filter-bar";
import { FilterBarSkeleton } from "@/components/repositories/filter-bar-skeleton";
import { RepositoryCard } from "@/components/repositories/repository-card";
import { RepositoryCardSkeleton } from "@/components/repositories/repository-card-skeleton";
import { Repository } from "@/types/repository";
import React, { useEffect, useState } from "react";
import { fetchGithubRepositories } from "../actions/github-repositories";

function RepositoryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredRepositories, setFilteredRepositories] = useState<
    Repository[]
  >([]);
  const { searchQuery, setSearchQuery } = useSearch();

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const fetchedRepos = await fetchGithubRepositories();
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
  };

  useEffect(() => {
    let result = repositories;

    if (activeFilter === "Connected") {
      result = result.filter((repo) => repo.connectionStatus === "CONNECTED");
    } else if (activeFilter === "Not Connected") {
      result = result.filter(
        (repo) => repo.connectionStatus === "NOT_CONNECTED"
      );
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(lowercaseQuery) ||
          (repo.description &&
            repo.description.toLowerCase().includes(lowercaseQuery))
      );
    }

    setFilteredRepositories(result);
  }, [repositories, activeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="lg:pl-64 flex-1">
        <Header
          showLogo={false}
          showSearchBar={false}
          showCreateNewButton={false}
        />
        <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-6">
          <FilterBarSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <RepositoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="lg:pl-64 flex-1">
        <Header
          showLogo={false}
          showSearchBar={false}
          showCreateNewButton={false}
        />
        <div className="text-center text-gray-500">No repositories found.</div>
      </div>
    );
  }

  return (
    <div className="lg:pl-64 flex-1">
      <Header
        showLogo={false}
        showSearchBar={true}
        showCreateNewButton={false}
        searchPlaceholder="Search repositories and its description..."
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-2 space-y-6">
        <FilterBar activeFilter={activeFilter} onFilter={handleFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepositories.map((repo) => (
            <RepositoryCard key={repo.name} repo={repo} />
          ))}
        </div>
        {filteredRepositories.length === 0 && (
          <div className="text-center text-gray-500">
            No repositories found.
          </div>
        )}
      </div>
    </div>
  );
}

export default RepositoryPage;
