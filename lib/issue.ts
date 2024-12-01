import { GitHubWebhookIssue } from "@/app/api/webhook/route";
import { IssueType } from "@prisma/client";

export function categorizeIssue(issue: GitHubWebhookIssue): IssueType {
  const title = issue.title.toLowerCase();
  const body = issue.body?.toLowerCase() || "";

  if (
    title.includes("bug") ||
    title.includes("error") ||
    title.includes("fix") ||
    body.includes("reproduce") ||
    body.includes("unexpected behavior")
  )
    return "BUG";

  if (
    title.includes("feature") ||
    title.includes("request") ||
    title.includes("enhancement")
  )
    return "FEATURE";

  return "IMPROVEMENT";
}

export function isBotTagged(comment: string, botUsername: string) {
  return comment.includes(`@${botUsername}`);
}
