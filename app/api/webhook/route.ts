import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log("Payload received:", payload);

    if (payload.action !== "opened" && payload.action !== "synchronize") {
      console.log("Ignored event:", payload.action);
      return NextResponse.json({ message: "Ignored event" }, { status: 200 });
    }

    const { pull_request, repository } = payload;
    const repoFullName = repository.full_name;
    console.log("Processing PR for repository:", repoFullName);

    // Find webhook and associated user
    const webhook = await db.webhook.findFirst({
      where: { repoFullName },
      include: {
        user: {
          include: { accounts: true },
        },
      },
    });

    if (!webhook) {
      console.error("Webhook not found for repository:", repoFullName);
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }
    console.log("Webhook found, user ID:", webhook.user.id);

    const octokit = new Octokit({
      auth: webhook.user.accounts[0].access_token,
    });

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
    console.log("Pull request diff fetched successfully");

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
    console.log("AI review generated successfully");

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
    console.log("Review posted successfully on the PR");

    // Update the lastTriggered timestamp
    await db.webhook.update({
      where: { id: webhook.id },
      data: { lastTriggered: new Date() },
    });
    console.log("Webhook timestamp updated");

    return NextResponse.json(
      { message: "Review posted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process webhook",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    console.log("Received GET request", {
      method: request.method,
      url: request.url,
      headers: request.headers,
    });

    return new Response(
      JSON.stringify({ message: "GET request successful", data: "Test data" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error handling GET request:", error);
    return new Response(
      JSON.stringify({ message: "GET request failed", error: error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
