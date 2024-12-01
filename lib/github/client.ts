import { getOctokitClient } from "@/app/actions/github-repositories";

export async function postGitHubComment(
  repoFullName: string,
  issueNumber: number,
  body: string
) {
  const { octokit } = await getOctokitClient();
  const [owner, repo] = repoFullName.split("/");

  try {
    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body,
    });
    return response.data;
  } catch (error) {
    console.log("error --postGithubComment");
    throw error;
  }
}
