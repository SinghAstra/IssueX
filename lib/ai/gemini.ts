"use server";
import { GitHubWebhookIssue } from "@/app/api/webhook/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IssueType } from "@prisma/client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

type ResponseSection = {
  section: string;
  title: string;
  text: string;
};

const sectionConfigs = {
  FEATURE: [
    {
      type: "implementation",
      title: "💡 Implementation Approach",
      promptSection: "1. IMPLEMENTATION APPROACH",
    },
    {
      type: "ui",
      title: "🎨 UI/UX Proposals",
      promptSection: "2. UI/UX PROPOSALS",
    },
    {
      type: "technical",
      title: "⚙️ Technical Considerations",
      promptSection: "3. TECHNICAL CONSIDERATIONS",
    },
  ],
  BUG: [
    {
      type: "diagnosis",
      title: "🔍 Diagnosis",
      promptSection: "1. DIAGNOSIS",
    },
    {
      type: "solutions",
      title: "🛠️ Solution Approaches",
      promptSection: "2. SOLUTION APPROACHES",
    },
    {
      type: "prevention",
      title: "🛡️ Prevention Measures",
      promptSection: "3. PREVENTION MEASURES",
    },
  ],
  IMPROVEMENT: [
    {
      type: "proposals",
      title: "💫 Improvement Proposals",
      promptSection: "1. IMPROVEMENT PROPOSALS",
    },
    {
      type: "ui",
      title: "🎨 UI/UX Enhancements",
      promptSection: "2. UI/UX ENHANCEMENTS",
    },
  ],
  OTHER: [
    {
      type: "solutions",
      title: "💡 Proposed Solutions",
      promptSection: "1. PROPOSED SOLUTIONS",
    },
  ],
};

export async function generateAIResponseSections(
  issue: GitHubWebhookIssue,
  issueType: IssueType
) {
  const sections = sectionConfigs[issueType];
  const responses: ResponseSection[] = [];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    for (const section of sections) {
      try {
        const sectionPrompt = `
          Based on this issue:

          ${issue}

          Please focus ONLY on providing a detailed response for the section:
          ${section.promptSection}

          Format each section clearly and provide practical, implementable code examples.
          Use markdown formatting for better readability.
          Include comments in code examples to explain the implementation details.
        `;

        console.log("sectionPrompt is ", sectionPrompt);

        const result = await model.generateContent(sectionPrompt);
        const response = result.response;
        const text = response.text();

        console.log("text is ", text);

        responses.push({
          section: section.type,
          title: section.title,
          text,
        });

        // Add a small delay between requests to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.log("error --generateAIResponseSections");
        throw error;
      }
    }

    return responses;
  } catch (error) {
    console.error("AI Response Generation Error:", error);
    return null;
  }
}

export async function generateAIResponse(prompt: string) {
  try {
    console.log("prompt --generateAIResponse is ", prompt);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro", // Use the most capable text model
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("Gemini response is ", text);

    return { text };
  } catch (error) {
    console.error("AI Response Generation Error:", error);
    return null;
  }
}
