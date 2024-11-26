"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Repository } from "@/types/repository";
import { Octokit } from "@octokit/rest";
import { getServerSession } from "next-auth";

export async function fetchGithubRepositories(): Promise<Repository[]> {
  const session = await getServerSession(authOptions);

  console.log("session --fetchGithubRepositories is ", session);

  if (!session) {
    throw new Error("No session available");
  }

  const accessToken = session.accessToken;

  if (!accessToken) {
    throw new Error("No access token available");
  }

  try {
    const octokit = new Octokit({
      auth: accessToken,
    });

    const { data: repositories } = await octokit.request("GET /user/repos", {
      per_page: 100,
    });

    console.log("repositories[0] is ", repositories[0]);

    const connectedRepos = await prisma.repository.findMany({
      where: { userId: session.user.id },
      select: { githubId: true },
    });

    const connectedRepoIds = new Set(
      connectedRepos.map((repo) => repo.githubId)
    );

    const reposWithLanguages = await Promise.all(
      repositories.map(async (repo) => {
        // Fetch languages for each repository
        const { data: languages } = await octokit.request(
          "GET /repos/{owner}/{repo}/languages",
          {
            owner: repo.owner.login,
            repo: repo.name,
          }
        );

        return {
          ...repo,
          repoLanguages: Object.keys(languages),
        };
      })
    );

    return reposWithLanguages.map(
      (repo): Repository => ({
        name: repo.name,
        description: repo.description,
        languages:
          repo.repoLanguages.length > 0 ? repo.repoLanguages : ["Unknown"],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        isConnected: connectedRepoIds.has(repo.id),
        updatedAt: repo.updated_at,
        url: repo.html_url,
        githubId: repo.id,
      })
    );
  } catch (error) {
    console.log("Error fetching GitHub repositories:", error);
    throw error;
  }
}
