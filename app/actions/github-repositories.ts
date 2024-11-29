"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Repository } from "@/types/repository";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import { getServerSession } from "next-auth";
import path from "path";

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

export async function createIssueTemplates(repoFullName: string) {
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

  const templateDir = path.join(
    process.cwd(),
    "lib",
    "github",
    "issue_templates"
  );
  const templateFiles = [
    "improvement.yml",
    "feature_request.yml",
    "bug_report.yml",
  ];

  const [owner, repo] = repoFullName.split("/");

  try {
    const existingContent = await octokit.repos.getContent({
      owner,
      repo,
      path: ".github",
    });

    if (
      Array.isArray(existingContent.data) &&
      existingContent.data.length > 0
    ) {
      for (const file of existingContent.data) {
        await octokit.repos.deleteFile({
          owner,
          repo,
          path: file.path,
          message: `Remove existing issue template: ${file.name}`,
          sha: file.sha,
        });
      }
    }
  } catch (error) {
    if (!(error instanceof Error && error.message.includes("404"))) {
      console.log("Error checking existing directory:", error);
      throw error;
    }
  }

  for (const templateFile of templateFiles) {
    const filePath = path.join(templateDir, templateFile);
    const fileContent = fs.readFileSync(filePath, "utf8");

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `.github/ISSUE_TEMPLATE/${templateFile}`,
        message: `Add/Update ${templateFile} issue template`,
        content: Buffer.from(fileContent).toString("base64"),
        committer: {
          name: "IssueX Bot",
          email: "singhisabhaypratap@gmail.com",
        },
        author: {
          name: "IssueX Bot",
          email: "singhisabhaypratap@gmail.com",
        },
      });
    } catch (error) {
      console.log(`Error creating/updating ${templateFile}:`, error);
      throw error;
    }
  }
}

async function createWebhook(repoFullName: string) {
  try {
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

    const WEBHOOK_URL = process.env.NEXT_AUTH_URL + "/api/webhook";
    const WEBHOOK_SECRET = process.env.NEXT_AUTH_SECRET;

    if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
      throw new Error("Webhook URL or secret not configured");
    }

    const [owner, repo] = repoFullName.split("/");

    const { data: webhook } = await octokit.repos.createWebhook({
      owner,
      repo,
      config: {
        url: WEBHOOK_URL,
        content_type: "json",
        secret: WEBHOOK_SECRET,
      },
      events: ["issues", "issue_comment"],
      active: true,
    });

    return webhook;
  } catch (error) {
    console.log("Error creating webhook:", error);
    throw new Error("Failed to create repository webhook");
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

  const webhook = await createWebhook(repoFullName);

  console.log("webhook is ", webhook);

  await createIssueTemplates(repoFullName);

  return prisma.repository.create({
    data: {
      ...repositoryDetails,
      userId: session.user.id,
      connectionStatus: "CONNECTED",
      webhookId: webhook.id.toString(),
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
