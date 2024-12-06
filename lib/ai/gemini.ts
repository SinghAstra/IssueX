"use server";
import { GitHubWebhookIssue } from "@/app/api/webhook/route";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIResponse(issue: GitHubWebhookIssue) {
  try {
    const prompt = `
    Based on this issue:
    ${issue}
    Write the Code to Resolve this issue
    Include comments in code examples to explain the implementation details.
  `;
    console.log("prompt --generateAIResponse is ", prompt);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
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
