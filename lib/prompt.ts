import { Issue, IssueType } from "@prisma/client";

export function createAIPrompt(issue: Issue, issueType: IssueType) {
  const basePrompts = {
    BUG: (title: string, body: string) => `
    Bug Report Analysis:
    Title: ${title}
    Description: ${body}

    Basic Diagnostic Steps:
    1. Confirm the bug's existence
    2. Identify potential causes
    3. Suggest initial troubleshooting approaches
  `,

    FEATURE: (title: string, body: string) => `
    Feature Request Analysis:
    Title: ${title}
    Description: ${body}

    Initial Evaluation:
    1. Understand the core requirement
    2. Assess technical feasibility
    3. Outline potential implementation approach
  `,

    IMPROVEMENT: (title: string, body: string) => `
    Improvement Suggestion Analysis:
    Title: ${title}
    Description: ${body}

    Key Considerations:
    1. Identify areas for enhancement
    2. Evaluate potential impact
    3. Propose initial optimization strategies
  `,
    OTHER: (title: string, body: string) => `
    General Issue Analysis:
    ----------------------
    Title: ${title}
    Description: ${body}

    Prompt Guidelines:
    -----------------
    1. Carefully review the issue details
    2. Identify the primary concern or request
    3. Provide a clear, concise initial assessment
    4. Suggest potential next steps or clarification needed`,
  };

  return basePrompts[issueType](issue.title, issue.body || "");
}
