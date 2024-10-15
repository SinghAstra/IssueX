import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const payload = await request.json();

  console.log("payload --post --webhook is ", payload);

  if (payload.action !== "opened" && payload.action !== "synchronize") {
    return NextResponse.json({ message: "Ignored event" }, { status: 200 });
  }

  const { pull_request, repository } = payload;
  const repoFullName = repository.full_name;

  const webhook = await db.webhook.findFirst({
    where: { repoFullName },
    include: {
      user: {
        include: { accounts: true },
      },
    },
  });

  if (!webhook) {
    return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
  }

  const octokit = new Octokit({ auth: webhook.user.accounts[0].access_token });

  // Fetch the PR diff
  const { data: diff } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner: repository.owner.login,
      repo: repository.name,
      pull_number: pull_request.number,
      mediaType: { format: "diff" },
    }
  );

  // Use Gemini to review the code
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Review the following code diff and provide constructive feedback:

  // ${diff}

  // Please provide your review in the following format:
  // 1. Summary of changes
  // 2. Potential issues or concerns
  // 3. Suggestions for improvement
  // 4. Any praise for good practices or implementations`;

  const result = await model.generateContent(prompt);
  const review = result.response.text();

  // Post the review as a comment on the PR
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: pull_request.number,
      body: review,
    }
  );

  // Update the lastTriggered timestamp
  await db.webhook.update({
    where: { id: webhook.id },
    data: { lastTriggered: new Date() },
  });

  return NextResponse.json(
    { message: "Review posted successfully" },
    { status: 200 }
  );
}
