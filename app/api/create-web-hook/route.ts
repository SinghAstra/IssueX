import { auth } from "@/auth";
import axios from "axios";
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

    const response = await axios.post(
      `${GITHUB_API_BASE_URL}/repos/${repoFullName}/hooks`,
      {
        name: "web",
        active: true,
        events: ["pull_request"],
        config: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/github-webhook`,
          content_type: "json",
          insecure_ssl: "0",
        },
      },
      {
        headers: {
          Authorization: `token ${session.user.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return Response.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error creating webhook:", error);
    return Response.json(
      { success: false, error: "Failed to create webhook" },
      { status: 500 }
    );
  }
}
