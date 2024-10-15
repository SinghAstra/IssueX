import { auth } from "@/auth";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";
import { Octokit } from "@octokit/core";

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { repoFullName } = await request.json();

    const [owner, repo] = repoFullName.split("/");

    if (!owner || !repo) {
      return Response.json(
        { error: "Invalid repository name" },
        { status: 400 }
      );
    }

    const octokit = new Octokit({
      auth: session.user.accessToken,
    });

    const response = await octokit.request(
      `${GITHUB_API_BASE_URL}/repos/{owner}/{repo}/hooks`,
      {
        owner: owner,
        repo: repo,
        name: "web",
        active: true,
        events: ["push", "pull_request"],
        config: {
          url: siteConfig.url,
          content_type: "json",
          insecure_ssl: "0",
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const email = session.user.email ?? undefined;

    if (!email) {
      return Response.json({ error: "User email not found" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const webhook = await db.webhook.create({
      data: {
        userId: user.id,
        repoFullName: repoFullName,
      },
    });

    return Response.json({
      message: "Connected Successfully.",
      session,
      response,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to connect Repository" },
      { status: 500 }
    );
  }
}
