"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro", // Use the most capable text model
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini response is ", text);

    return { text };
  } catch (error) {
    console.error("AI Response Generation Error:", error);
    return null;
  }
}
