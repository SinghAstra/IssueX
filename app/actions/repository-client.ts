// actions/repository-client.ts
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createRepositoryConnection,
  fetchGitHubRepositoryDetails,
  fetchRepositoryConnectionStatus,
} from "./github-repositories";

export function useRepositoryConnection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const connectRepositoryHandler = async (fullName: string) => {
    setLoading(true);
    setError(null);

    console.log("In the connect repository handler.");

    try {
      const result = await fetchRepositoryConnectionStatus(fullName);
      console.log("result  --fetchRepositoryConnectionStatus is ", result);
      switch (result.status) {
        case "CONNECTED":
          router.push(`/repositories/${result.id}`);
          break;
        case "PENDING":
          router.push(`/repositories/${result.id}/template`);
          break;
        case "NOT_CONNECTED":
          const githubRepoDetails = await fetchGitHubRepositoryDetails(
            fullName
          );
          console.log(
            "githubRepoDetails --NOT_CONNECTED is ",
            githubRepoDetails
          );
          const newRepo = await createRepositoryConnection(githubRepoDetails);
          console.log("newRepo --NOT_CONNECTED is ", newRepo);
          router.push(`/repositories/${newRepo.id}/template`);
          break;
        default:
          setError("Unexpected repository status");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    connectRepository: connectRepositoryHandler,
    loading,
    error,
  };
}
