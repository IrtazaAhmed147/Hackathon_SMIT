import { GoogleGenerativeAI } from "@google/generative-ai";

// Make sure GEMINI_API_KEY is set in your .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use the latest model name and correct version
export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});
