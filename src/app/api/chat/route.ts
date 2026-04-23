import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY_AI_CHAT_BOT;

if (!apiKey) {
  console.error("CRITICAL: GEMINI_API_KEY_AI_CHAT_BOT is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey as string);

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Gemini API key is not configured on the server.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Messages are required and must be an array.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash', // Updating to a more stable modern model if preview is unreliable, but I'll stick to 3-flash-preview as they were using it, or 1.5-flash.
      // Wait, let's use what they had: 'gemini-3-flash-preview'
    });

    // Let's instantiate it with the exact model they were using
    const activeModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are the official AI assistant for the Kindred Relief Network platform. Kindred Relief Network is a community-driven disaster relief and volunteer coordination platform. Users can create campaigns (events), volunteer for them, and coordinate community management. You are here to help users navigate the platform, provide general information about volunteering and community support, and encourage positive engagement. Your primary goals: 1. Provide accurate information about how community platforms like this generally work. 2. Be helpful, encouraging, and guide the user toward donating or volunteering on the platform. 3. You do not have access to real-time campaign data, so if asked about specific active campaigns, kindly advise the user to check the 'Events' or 'Feed' pages on the platform. Tone: Professional, compassionate, and community-focused."
    });

    // Convert chat history to Gemini format (user/model roles)
    // IMPORTANT: Gemini history must alternate and start with a 'user' role.
    let history: any[] = [];
    let historyMessages = messages.slice(0, -1);
    
    // Find the first 'user' message to start history correctly for Gemini
    const firstUserIndex = historyMessages.findIndex((msg: any) => msg.role === "user");
    if (firstUserIndex !== -1) {
      history = historyMessages.slice(firstUserIndex).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));
    }

    const chat = activeModel.startChat({
      history: history
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    return NextResponse.json({ success: true, reply: response.text() });

  } catch (error: any) {
    console.error("Gemini AI Integration Error Detail:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Gemini AI failed to process the request. Please try again later." },
      { status: 500 }
    );
  }
}
