"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIResponse(prompt: string) {
  try {
    //   const prompt = `
    //   Act as Full Stack Web Developer
    //   Write the code in github Comment Markdown
    //   Write code to add this feature
    //   You can take Inspiration From SAAS.
    //   Specify file name and location too
    //   You can suggest UI components to build using Shadcn And Tailwind if required
    //   You can suggest backend actions and api to build if required
    //   Write the Code.
    //   Include comments in code to explain the implementation details.
    //   Return the response as an array no response should have more than 65,000 characters.
    //   ${issue.body}
    //   The Tech Stack is
    //   - Frontend Framework - Next.js (React)
    //   - Backend - Next.js API Routes / Serverless Functions
    //   - Programming Language - TypeScript
    //   - Styling - Tailwind CSS
    //   - UI Component Library - Shadcn/UI
    //   - Form Handling - React Hook Form
    //   - Validation - Zod
    //   - Authentication - NextAuth.js
    //   - Database - Prisma with PostgreSQL
    // `;
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
