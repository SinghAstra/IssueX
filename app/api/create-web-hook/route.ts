import { auth } from "@/auth";
import { siteConfig } from "@/config/site";
import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function POST(request: Request) {
  try {
    const session = await auth();

    console.log("session --createWebHook is ", session);

    if (!session || !session.user?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { repoFullName } = await request.json();

    console.log("repoFullName is ", repoFullName);

    const [owner, repo] = repoFullName.split("/");

    if (!owner || !repo) {
      return Response.json(
        { error: "Invalid repository name" },
        { status: 400 }
      );
    }

    console.log(
      "`${GITHUB_API_BASE_URL}/repos/${repoFullName}/hooks` is ",
      `${GITHUB_API_BASE_URL}/repos/${repoFullName}/hooks`
    );

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

    return Response.json({ success: true, session, response });
  } catch (error) {
    console.error("Error creating webhook:", error);
    return Response.json(
      { success: false, error: "Failed to create webhook" },
      { status: 500 }
    );
  }
}
