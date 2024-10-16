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

    const webhookUrl = `${siteConfig.url}/api/webhook`;
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

    const response = await octokit.request(
      `POST ${GITHUB_API_BASE_URL}/repos/{owner}/{repo}/hooks`,
      {
        owner: owner,
        repo: repo,
        name: "web",
        active: true,
        events: ["push", "pull_request"],
        config: {
          url: webhookUrl,
          content_type: "json",
          insecure_ssl: "0",
          secret: webhookSecret,
        },
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    console.log(
      "response --from-github-when-trying-to-create-webhook is ",
      response
    );

    if (response.status !== 201) {
      console.error("Unexpected response from GitHub API:", response);
      return Response.json(
        { error: "Failed to create webhook on GitHub" },
        { status: response.status }
      );
    }

    if (!response.data || typeof response.data !== "object") {
      console.error("Unexpected response data from GitHub API:", response.data);
      return Response.json(
        { error: "Invalid response from GitHub API" },
        { status: 500 }
      );
    }

    console.log("Webhook created:", response.data);

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
    console.log("error --from-github-when-trying-to-create-webhook is ", error);

    return Response.json(
      { success: false, message: "Failed to connect Repository" },
      { status: 500 }
    );
  }
}
