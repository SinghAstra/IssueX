import { auth } from "@/auth";
import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user?.accessToken) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await axios.get(`${GITHUB_API_BASE_URL}/user/repos`, {
      headers: {
        Authorization: `token ${session.user.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repos = response.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      repoFullName: repo.full_name,
      private: repo.private,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
    }));

    return Response.json({ repos });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
