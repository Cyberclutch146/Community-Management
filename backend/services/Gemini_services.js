const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY_AI_CHAT_BOT;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY_AI_CHAT_BOT is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * @desc    Ask Gemini AI a question about a specific campaign
 * @param   {Array} messages - Chat history
 * @param   {Object} campaign - Campaign details
 * @returns {Promise<string>} - AI response text
 */
exports.askGemini = async (messages, campaign) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    // 🔥 SYSTEM CONTEXT (VERY IMPORTANT)
    // This defines the persona and constraints for the AI
    const systemPrompt = `
You are a dedicated assistant for the social campaign: "${campaign.title}".

Campaign Information:
- Title: ${campaign.title}
- Description: ${campaign.description}
- Location: ${campaign.location.name}
- Needs: ${campaign.needs.join(", ")}

Your Primary Goals:
1. Provide accurate information ONLY about this specific campaign.
2. Be helpful, encouraging, and guide the user toward donating or volunteering.
3. If the user asks for information that is not provided in the campaign details above, politely explain that you do not have that specific information.

Tone: Professional, compassionate, and community-focused.
`;

    // Convert chat history to Gemini format (user/model roles)
    // We skip the last message here because it's passed separately to sendMessage
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        ...history
      ]
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    return response.text();

  } catch (err) {
    console.error("Gemini AI Integration Error:", err.message);
    throw new Error("Gemini AI failed to process the request. Please try again later.");
  }
};
