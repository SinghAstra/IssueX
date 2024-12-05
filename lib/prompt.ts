import { GitHubWebhookIssue } from "@/app/api/webhook/route";
import { IssueType } from "@prisma/client";

export function createAIPrompt(
  issue: GitHubWebhookIssue,
  issueType: IssueType
) {
  const basePrompts = {
    FEATURE: (title: string, body: string) => `
      As an AI assistant, analyze this feature request and provide multiple detailed responses as separate sections:

      FEATURE REQUEST:
      Title: ${title}
      Description: ${body}

      Please provide the following in your analysis:

      1. IMPLEMENTATION APPROACH:
      - Detailed technical architecture
      - Step-by-step implementation guide
      - Code examples and explanations with comments
      - Best practices and considerations

      2. UI/UX PROPOSALS:
      - Provide 2-3 different UI approaches
      - Include component structure
      - Suggest interactions and animations
      - Consider responsive design
      - Include sample React/Next.js code with Tailwind CSS

      3. TECHNICAL CONSIDERATIONS:
      - Performance implications
      - Security considerations
      - Scalability aspects
      - Testing strategy

      Format each section clearly and provide practical, implementable code examples.
      Use markdown formatting for better readability.
      Include comments in code examples to explain the implementation details.
    `,

    BUG: (title: string, body: string) => `
      Analyze this bug report and provide a comprehensive response:

      BUG REPORT:
      Title: ${title}
      Description: ${body}

      Please provide:

      1. DIAGNOSIS:
      - Root cause analysis
      - Impact assessment
      - Affected components

      2. SOLUTION APPROACHES:
      - Multiple potential fixes
      - Code examples with comments
      - Testing strategies

      3. PREVENTION MEASURES:
      - Best practices
      - Code improvements
      - Testing recommendations

      Format each section clearly and provide practical, implementable code examples.
      Use markdown formatting for better readability.
      Include comments in code examples to explain the implementation details.
    `,

    IMPROVEMENT: (title: string, body: string) => `
      As an AI assistant, analyze this improvement request and provide multiple detailed responses as separate sections:

      IMPROVEMENT REQUEST:
      Title: ${title}
      Description: ${body}

      Please provide the following in your analysis:

      1. IMPROVEMENT PROPOSALS:
      - Multiple optimization approaches
      - Include sample React/Next.js code with comments

      2. UI/UX ENHANCEMENTS:
      - Visual improvements
      - User experience optimizations
      - Accessibility enhancements
      - Component refinements
      - Include sample React/Next.js code with Tailwind CSS

      Format each section clearly and provide practical, implementable code examples.
      Use markdown formatting for better readability.
      Include comments in code examples to explain the implementation details.
    `,

    OTHER: (title: string, body: string) => `
      As an AI assistant, analyze this issue and provide a structured response:

      ISSUE DETAILS:
      Title: ${title}
      Description: ${body}

      Please provide the following comprehensive analysis:

      1. PROPOSED SOLUTIONS:
      - Multiple approach suggestions
      - Implementation considerations
      - Code examples where applicable
      - Best practices and recommendations
      - Include sample React/Next.js code if UI/UX related

      Format each section clearly and provide practical, implementable code examples.
      Use markdown formatting for better readability.
      Include comments in code examples to explain the implementation details.
    `,
  };

  return basePrompts[issueType](issue.title, issue.body || "");
}
