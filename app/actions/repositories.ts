"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Repository } from "@/types/repository";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import { getServerSession } from "next-auth";
import path from "path";

export async function getOctokitClient() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("No active session found. User might not be authenticated.");
    throw new Error("Authentication required. Please log in.");
  }

  if (!session.user || !session.user.id) {
    throw new Error("Invalid session: User information is incomplete");
  }

  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error(
      "No GitHub access token available. Please reconnect your GitHub account."
    );
  }

  return {
    octokit: new Octokit({ auth: accessToken }),
    userId: session.user.id,
  };
}

export async function fetchGithubRepositories(): Promise<Repository[]> {
  try {
    const { octokit, userId } = await getOctokitClient();

    const { data: repositories } = await octokit.request("GET /user/repos", {
      per_page: 100,
      sort: "updated",
      direction: "desc",
    });

    const connectedRepos = await prisma.repository.findMany({
      where: { userId },
      select: {
        id: true,
        githubId: true,
        connectionStatus: true,
      },
    });

    const connectedRepoMap = new Map(
      connectedRepos.map((connectedRepo) => [
        connectedRepo.githubId,
        {
          id: connectedRepo.id,
          connectionStatus: connectedRepo.connectionStatus,
        },
      ])
    );

    const reposWithLanguages = await Promise.all(
      repositories.map(async (repo) => {
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

    return reposWithLanguages.map((repo): Repository => {
      const connectedRepoInfo = connectedRepoMap.get(repo.id);
      return {
        id: connectedRepoInfo?.id || repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        languages:
          repo.repoLanguages.length > 0 ? repo.repoLanguages : ["Unknown"],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        connectionStatus:
          connectedRepoInfo?.connectionStatus || "NOT_CONNECTED",
        updatedAt: repo.updated_at,
        url: repo.html_url,
        githubId: repo.id,
      };
    });
  } catch (error) {
    console.log("Error fetching GitHub repositories:", error);
    throw error;
  }
}

export async function fetchGitHubRepositoryDetails(fullName: string) {
  const { octokit } = await getOctokitClient();

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
    console.log("error --fetchGitHubRepositoryDetails:", error);
    throw error;
  }
}

export async function deleteExistingRepository(repoFullName: string) {
  try {
    const { octokit } = await getOctokitClient();
    const [owner, repo] = repoFullName.split("/");
    const existingContent = await octokit.repos.getContent({
      owner,
      repo,
      path: ".github",
    });

    console.log("existingContent is ", existingContent);
    console.log("existingContent.data is ", existingContent.data);

    if (
      Array.isArray(existingContent.data) &&
      existingContent.data.length > 0
    ) {
      for (const item of existingContent.data) {
        console.log("Item details:", item);

        switch (item.type) {
          case "file":
            await octokit.repos.deleteFile({
              owner,
              repo,
              path: item.path,
              message: `Remove existing file: ${item.name}`,
              sha: item.sha,
            });
            console.log(`Deleted file: ${item.path}`);
            break;

          case "dir":
            await deleteDirectoryContents(repoFullName, item.path);
            console.log(`Deleted directory contents: ${item.path}`);
            break;

          default:
            console.log(`Unhandled item type: ${item.type} for ${item.path}`);
        }
      }
    }
  } catch (error) {
    if (error instanceof Error && "status" in error && error.status === 404) {
      console.log(".github directory does not exist. Continuing...");
      return;
    }
    console.log("error --createIssueTemplate.");
  }
}

export async function createIssueTemplates(repoFullName: string) {
  const { octokit } = await getOctokitClient();

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
  console.log("Before deleteExistingRepository");
  await deleteExistingRepository(repoFullName);
  console.log("After deleteExistingRepository");

  for (const templateFile of templateFiles) {
    console.log("templateFile is ", templateFile);
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
    console.log("In createWebhook");
    const { octokit } = await getOctokitClient();

    let WEBHOOK_URL;

    if (process.env.NODE_ENV === "development") {
      WEBHOOK_URL =
        "https://b7ef-2409-4089-a095-2f67-1839-c3cf-5ed1-7d9c.ngrok-free.app/api/webhook";
    } else {
      WEBHOOK_URL = process.env.NEXT_AUTH_URL + "/api/webhook";
    }

    console.log("WEBHOOK_URL is ", WEBHOOK_URL);

    const WEBHOOK_SECRET = process.env.NEXT_AUTH_SECRET;
    console.log("WEBHOOK_SECRET is ", WEBHOOK_SECRET);

    if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
      throw new Error("Webhook URL or secret not configured");
    }

    const [owner, repo] = repoFullName.split("/");

    console.log("owner is ", owner);
    console.log("repo is ", repo);

    const { data: existingWebhooks } = await octokit.repos.listWebhooks({
      owner,
      repo,
    });

    existingWebhooks.map((webhook) => {
      console.log("webhook is ", webhook);
    });

    const existingWebhook = existingWebhooks.find(
      (webhook) => webhook.config.url === WEBHOOK_URL
    );

    if (existingWebhook) {
      console.log("Webhook already exists:", existingWebhook);
      return existingWebhook;
    }

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

    console.log("webhook is ", webhook);

    return webhook;
  } catch (error) {
    console.log("Error creating webhook:", error);
    throw new Error("Failed to create repository webhook");
  }
}

export async function createRepositoryConnection(repoFullName: string) {
  const { userId } = await getOctokitClient();

  const repositoryDetails = await fetchGitHubRepositoryDetails(repoFullName);
  // Check if repository already exists for this user
  const existingRepository = await prisma.repository.findUnique({
    where: {
      userId_fullName: {
        userId,
        fullName: repositoryDetails.fullName,
      },
    },
  });

  console.log("existingRepository is ", existingRepository);

  if (existingRepository) {
    return existingRepository;
  }

  const webhook = await createWebhook(repoFullName);

  console.log("webhook is ", webhook);

  await createIssueTemplates(repoFullName);

  return prisma.repository.create({
    data: {
      ...repositoryDetails,
      userId,
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

async function deleteDirectoryContents(
  repoFullName: string,
  directoryPath: string
) {
  try {
    const { octokit } = await getOctokitClient();
    const [owner, repo] = repoFullName.split("/");
    const { data: dirContents } = await octokit.repos.getContent({
      owner,
      repo,
      path: directoryPath,
    });

    if (Array.isArray(dirContents) && dirContents.length > 0) {
      for (const item of dirContents) {
        if (item.type === "file") {
          await octokit.repos.deleteFile({
            owner,
            repo,
            path: item.path,
            message: `Remove file from ${directoryPath}`,
            sha: item.sha,
          });
        } else if (item.type === "dir") {
          await deleteDirectoryContents(repoFullName, item.path);
        }
      }
    }
  } catch (error) {
    console.log("error --deleteDirectoryContents", error);
    throw error;
  }
}

export async function getRepositoryDetails(repoFullName: string) {
  console.log("repoFullName is ", repoFullName);
  const session = await getServerSession(authOptions);
  console.log("session is ", session);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const repo = await prisma.repository.findFirst({
    where: {
      fullName: repoFullName,
      userId: session.user.id,
    },
  });

  if (!repo) {
    throw new Error("Repository not found");
  }

  try {
    const { octokit } = await getOctokitClient();
    const [owner, repoName] = repo.fullName.split("/");

    const { data: githubRepoDetails } = await octokit.repos.get({
      owner,
      repo: repoName,
    });

    return {
      ...repo,
      githubCreatedAt: new Date(githubRepoDetails.created_at),
      githubUpdatedAt: new Date(githubRepoDetails.updated_at),
    };
  } catch (error) {
    console.error("Error fetching GitHub repository details:", error);
    return repo;
  }
}

export async function getRepositoryIssues(repoFullName: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const repository = await prisma.repository.findFirst({
    where: { fullName: repoFullName, userId: session.user.id },
  });

  if (!repository) {
    throw new Error(
      `Repository with full name ${repoFullName} not found --getRepositoryIssues`
    );
  }

  return prisma.issue.findMany({
    where: { repositoryId: repository.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getIssueComments(issueId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { issueId },
      orderBy: { createdAt: "asc" },
    });

    return comments;
  } catch (error) {
    console.log("error --getIssueComments");
    throw error;
  }
}
