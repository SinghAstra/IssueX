const GITHUB_API_BASE_URL = "https://api.github.com";
import { auth } from "@/auth";
import { Octokit } from "@octokit/core";

export async function GET(request: Request) {
  try {
    const session = await auth();

    console.log("session --createWebHook is ", session);

    if (!session || !session.user?.accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const octokit = new Octokit({
      auth: session.user.accessToken,
    });

    const response = await octokit.request(
      `${GITHUB_API_BASE_URL}/repos/SinghAstra/Social/hooks`,
      {
        owner: "SinghAstra",
        repo: "Social",
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
