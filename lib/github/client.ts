import { getOctokitClient } from "@/app/actions/github-repositories";

export async function postGitHubComment(
  repoFullName: string,
  issueNumber: number,
  body: string
) {
  const { octokit } = await getOctokitClient();
  const [owner, repo] = repoFullName.split("/");

  try {
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body,
    });
  } catch (error) {
    console.log("error --postGithubComment");
    throw error;
  }
}
