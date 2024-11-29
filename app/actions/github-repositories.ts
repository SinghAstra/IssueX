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
      sort: "updated",
      direction: "desc",
    });

    const connectedRepos = await prisma.repository.findMany({
      where: { userId: session.user.id },
      select: {
        githubId: true,
        connectionStatus: true,
      },
    });

    const connectedRepoMap = new Map(
      connectedRepos.map((repo) => [repo.githubId, repo.connectionStatus])
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
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        languages:
          repo.repoLanguages.length > 0 ? repo.repoLanguages : ["Unknown"],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        connectionStatus: connectedRepoMap.get(repo.id) || "NOT_CONNECTED",
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

export async function fetchGitHubRepositoryDetails(fullName: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const accessToken = session.accessToken;

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const octokit = new Octokit({
    auth: accessToken,
  });

  try {
    const { data: repo } = await octokit.request(`GET /repos/{owner}/{repo}`, {
      owner: fullName.split("/")[0],
      repo: fullName.split("/")[1],
    });

    return {
      name: repo.name,
      fullName: repo.full_name,
      githubId: repo.id,
      description: repo.description,
      htmlUrl: repo.html_url,
    };
  } catch (error) {
    console.log(
      "GitHub Repository Fetch Error --fetchGitHubRepositoryDetails:",
      error
    );
    throw new Error("Failed to fetch repository details");
  }
}

export async function createRepositoryConnection(repoFullName: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const repositoryDetails = await fetchGitHubRepositoryDetails(repoFullName);
  // Check if repository already exists for this user
  const existingRepository = await prisma.repository.findUnique({
    where: {
      userId_fullName: {
        userId: session.user.id,
        fullName: repositoryDetails.fullName,
      },
    },
  });

  if (existingRepository) {
    // Update existing repository
    return existingRepository;
  }

  return prisma.repository.create({
    data: {
      ...repositoryDetails,
      userId: session.user.id,
      connectionStatus: "CONNECTED",
    },
  });
}

export async function fetchRepositoryConnectionStatus(fullName: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  console.log("In fetchRepositoryConnectionStatus");

  const existingRepository = await prisma.repository.findUnique({
    where: {
      userId_fullName: {
        userId: session.user.id,
        fullName: fullName,
      },
    },
  });

  console.log(
    "existingRepository --fetchRepositoryConnectionStatus is ",
    existingRepository
  );

  if (existingRepository) {
    return {
      id: existingRepository.id,
      status: existingRepository.connectionStatus,
    };
  }

  return {
    status: "NOT_CONNECTED",
  };
}
