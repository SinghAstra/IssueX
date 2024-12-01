import { generateAIResponse } from "@/lib/ai/gemini";
import { categorizeIssue } from "@/lib/issue";
import { prisma } from "@/lib/prisma";
import { createAIPrompt } from "@/lib/prompt";
import { Octokit } from "@octokit/rest";
import crypto from "crypto";
import { NextResponse } from "next/server";

function verifyGithubWebhook(
  payload: string,
  signature: string,
  secret: string
) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(
    "sha256=" + hmac.update(payload).digest("hex"),
    "utf8"
  );
  const checksum = Buffer.from(signature, "utf8");
  return crypto.timingSafeEqual(digest, checksum);
}

export interface GitHubWebhookIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    id: number;
  };
}

interface GitHubWebhookPayload {
  action: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
    owner: {
      login: string;
      id: number;
    };
  };
  issue: GitHubWebhookIssue;
}

async function postGitHubComment(
  repoFullName: string,
  issueNumber: number,
  body: string
) {
  const accessToken = process.env.GITHUB_SERVICE_TOKEN;
  console.log("accessToken --postGithubComment is ", accessToken);

  if (!accessToken) {
    throw new Error("GitHub service token is not configured");
  }

  const octokit = new Octokit({ auth: accessToken });

  const [owner, repo] = repoFullName.split("/");

  try {
    const response = await octokit.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body,
    });

    console.log("comment --postGithubComment is ", response.data);
    return response.data;
  } catch (error) {
    console.log("error --postGithubComment");
    throw error;
  }
}

async function handleIssueEvent(
  data: GitHubWebhookPayload,
  repositoryId: string
) {
  try {
    console.log("In handleIssueEvent: ");
    const { action, issue, repository } = data;
    console.log("action is ", action);
    console.log("issue is ", issue);
    console.log("repository is ", repository);

    if (action !== "opened") return;

    const existingRepo = await prisma.repository.findUnique({
      where: { id: repositoryId },
    });

    console.log("existingRepo is ", existingRepo);

    if (!existingRepo) {
      console.log("Repository not found");
      return;
    }

    const issueType = categorizeIssue(issue);
    console.log("issueType is ", issueType);
    const issueData = {
      githubIssueId: issue.id,
      repositoryId: existingRepo.id,
      issueType,
      title: issue.title,
      body: issue.body,
      status: "OPEN",
    };
    console.log("issueData is ", issueData);
    const createdIssue = await prisma.issue.create({
      data: {
        githubIssueId: issue.id,
        repositoryId: existingRepo.id,
        issueType,
        title: issue.title,
        body: issue.body,
        status: "OPEN",
      },
    });
    console.log("createdIssue is ", createdIssue);

    const aiPrompt = createAIPrompt(issue, issueType);
    console.log("aiPrompt is ", aiPrompt);
    const aiResponse = await generateAIResponse(aiPrompt);
    console.log("aiResponse is ", aiResponse);

    if (aiResponse) {
      const githubComment = await postGitHubComment(
        repository.full_name,
        issue.number,
        aiResponse.text
      );

      console.log("githubComment is ", githubComment);

      await prisma.comment.create({
        data: {
          githubCommentId: githubComment.id,
          issueId: createdIssue.id,
          body: aiResponse.text,
          isAiGenerated: true,
        },
      });
    }
  } catch (error) {
    console.log("error --handleIssueEvent");
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const githubSignature = req.headers.get("x-hub-signature-256");
    const githubEvent = req.headers.get("x-github-event");
    const data = JSON.parse(payload);
    const repoFullName = data.repository.full_name;

    if (!githubSignature || !githubEvent) {
      return NextResponse.json(
        { error: "Missing signature or event type" },
        { status: 400 }
      );
    }

    const repository = await prisma.repository.findFirst({
      where: { fullName: repoFullName },
    });

    if (!repository?.webhookId) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }

    const isValid = verifyGithubWebhook(
      payload,
      githubSignature,
      process.env.NEXT_AUTH_SECRET!
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    console.log("githubEvent is ", githubEvent);
    console.log("data is ", data);

    switch (githubEvent) {
      case "issues":
        await handleIssueEvent(data, repository.id);
        break;
      //   case "issue_comment":
      //     await handleIssueCommentEvent(data, repository.id);
      //     break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
