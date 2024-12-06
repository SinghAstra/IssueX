import { GitHubWebhookIssue } from "@/app/api/webhook/route";
import { IssueType } from "@prisma/client";

interface generatePromptProps {
  issue: GitHubWebhookIssue;
  issueType: IssueType;
}

// Issue Prompt Generation Utility
export class IssuePromptGenerator {
  private techStack = [
    "Frontend Framework: Next.js (React)",
    "Backend: Next.js API Routes",
    "Language: TypeScript",
    "Styling: Tailwind CSS",
    "UI Library: Shadcn/UI",
    "Form Handling: React Hook Form",
    "Validation: Zod",
    "Authentication: NextAuth.js",
    "Database: Prisma with PostgreSQL",
  ];

  // Prompt Generation Strategy
  generatePrompt({ issue, issueType }: generatePromptProps) {
    const promptTemplates = {
      BUG: `
        Bug Fix Analysis:
        - Detailed problem description
        - Root cause investigation
        - Comprehensive solution strategy
        - Code fix with comments
        - Potential side-effect mitigation
      `,
      FEATURE: `
        Feature Implementation Guidance:
        - Comprehensive feature breakdown
        - Architectural considerations
        - Modular implementation approach
        - Code snippets with best practices
        - Performance and scalability insights
      `,
      IMPROVEMENT: `
        Code Improvement Recommendations:
        - Current implementation analysis
        - Optimization strategies
        - Refactoring suggestions
        - Performance enhancement techniques
        - Code quality improvements
      `,
      OTHER: `
        - Suggestion on Resolving this issue:
      `,
    };

    return `
      Project Context:
      - Tech Stack: ${this.techStack.join(", ")}
      
      Issue Type: ${IssueType}
      Issue Title: ${issue.title}
      
      Detailed Requirements:
      ${issue.body}
      
      ${promptTemplates[issueType]}
      
      Output Guidelines:
      - Provide modular, production-ready code
      - Include clear file structure
      - Add comprehensive comments
      - Suggest best practices
      - Maximum response length: 60,000 characters
    `;
  }

  splitLongResponse(response: string, maxLength: number = 60000): string[] {
    const comments: string[] = [];
    let currentComment = "";

    const sections = response.split("\n\n");

    for (const section of sections) {
      if ((currentComment + section).length > maxLength) {
        comments.push(currentComment);
        currentComment = section;
      } else {
        currentComment += section + "\n\n";
      }
    }

    if (currentComment) {
      comments.push(currentComment);
    }

    return comments;
  }
}
