import { Issue } from "@prisma/client";

export function categorizeIssue(issue: Issue) {
  const title = issue.title.toLowerCase();
  const body = issue.body?.toLowerCase() || "";

  if (
    title.includes("bug") ||
    title.includes("error") ||
    title.includes("fix") ||
    body.includes("reproduce") ||
    body.includes("unexpected behavior")
  )
    return "bug";

  if (
    title.includes("feature") ||
    title.includes("request") ||
    title.includes("enhancement")
  )
    return "feature";

  return "improvement";
}

export function isBotTagged(comment: string, botUsername: string) {
  return comment.includes(`@${botUsername}`);
}
