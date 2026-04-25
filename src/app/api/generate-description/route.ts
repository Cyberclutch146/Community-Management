import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { title, category } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required for AI generation" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY_AI_CHAT_BOT;
    
    if (!apiKey) {
      return NextResponse.json({ error: "AI API key is missing from environment variables" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write a short, engaging, and professional description (around 3-4 sentences) for a community event. 
    The event title is "${title}". 
    The event category is "${category || 'community event'}".
    The description should motivate people to join or contribute to the cause. Do not include hashtags or greetings, just the description paragraph.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ description: text });

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 });
  }
}
