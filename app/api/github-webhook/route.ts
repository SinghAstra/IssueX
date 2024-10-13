import { NextResponse } from "next/server";
// import { handlePullRequestEvent } from '@/services/pullRequestService';

export async function POST(request: Request) {
  const payload = await request.json();
  console.log("payload --someone created a pull request is ", payload);
  const githubEvent = request.headers.get("X-GitHub-Event");

  // if (githubEvent === 'pull_request' && payload.action === 'opened') {
  //   try {
  //     await handlePullRequestEvent(payload);
  //     return NextResponse.json({ success: true, message: 'PR review initiated' });
  //   } catch (error) {
  //     console.error('Error handling pull request event:', error);
  //     return NextResponse.json({ success: false, error: 'Failed to process pull request' }, { status: 500 });
  //   }
  // }

  return NextResponse.json({
    success: true,
    message: "Event received but not processed",
  });
}
