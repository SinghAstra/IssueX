"use client";

import { FilterBar } from "@/components/repositories/filter-bar";
import { RepositoryCard } from "@/components/repositories/repository-card";
import { Repository } from "@/types/repository";
import React, { useEffect, useState } from "react";
import { fetchGithubRepositories } from "../actions/github-repositories";

function RepositoryPage() {
  // const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const fetchedRepos = await fetchGithubRepositories();
        console.log("fetchedRepos is ", fetchedRepos);
        setRepositories(fetchedRepos);
      } catch (error) {
        console.log("Failed to fetch repositories", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  console.log("activeFilter is ", activeFilter);

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
