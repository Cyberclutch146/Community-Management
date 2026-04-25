import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAllEvents } from "@/services/aiTools";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ success: false, error: "No messages provided." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY_AI_CHAT_BOT;
    
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "AI API key is missing from environment variables" }, { status: 500 });
    }

    // Fetch live events to provide context to Gemini
    const events = await getAllEvents();
    const eventContext = events.map(e => {
      let needsStr = [];
      if (e.volunteersNeeded) needsStr.push(`${e.volunteersNeeded} volunteers`);
      if (e.goalAmount) needsStr.push(`$${e.goalAmount} (Raised: $${e.donatedAmount || 0})`);
      const needs = needsStr.length > 0 ? needsStr.join(", ") : "N/A";
      return `- ${e.title} (${e.category}) at ${e.location}. Need: ${needs}. Description: ${e.description}`;
    }).join("\n");

    const systemInstruction = `You are the Kindred Relief Network AI Assistant. 
You are a helpful, empathetic, and encouraging assistant for a community event and volunteering platform.
Your primary goal is to help users discover events, learn how to volunteer or donate, and guide them on organizing new events.

Here is the list of CURRENTLY LIVE events on the platform:
${eventContext || "No active events right now."}

When users ask for events, recommend these specific live events. Be conversational and natural. Do not list everything mechanically, but highlight a few relevant ones based on their query. Keep your responses concise (under 4-5 sentences) and engaging.`;

    const genAI = new GoogleGenerativeAI(apiKey);
    
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-flash-latest", "gemini-pro-latest"];
    let text = "";
    let lastError = null;

    // Format history for Gemini chat
    // The messages array is [{ role: 'user' | 'assistant', content: '...' }]
    // Gemini expects [{ role: 'user' | 'model', parts: [{ text: '...' }] }]
    // It also strictly requires the first message to be from the user.
    let chatHistory = messages.slice(0, -1);
    while (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
      chatHistory.shift();
    }

    const history = chatHistory.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));
    
    const latestMessage = messages[messages.length - 1].content;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: systemInstruction 
        });
        
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(latestMessage);
        const response = await result.response;
        text = response.text();
        if (text) break; 
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed:`, err.message);
      }
    }

    if (!text) {
      throw lastError || new Error("All AI models failed.");
    }

    return NextResponse.json({ success: true, reply: text });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong while generating a response." },
      { status: 500 }
    );
  }
}
