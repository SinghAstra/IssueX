// app/api/webhook/route.ts
import { prisma } from "@/lib/prisma";
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

    console.log("isValid is ", isValid);
    console.log("data is ", data);

    // switch (githubEvent) {
    //   case "issues":
    //     await handleIssueEvent(data, repository.id);
    //     break;
    //   case "issue_comment":
    //     await handleIssueCommentEvent(data, repository.id);
    //     break;
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
