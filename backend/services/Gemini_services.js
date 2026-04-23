const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY_AI_CHAT_BOT;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY_AI_CHAT_BOT is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * @desc    Ask Gemini AI a question
 * @param   {Array} messages - Chat history
 * @returns {Promise<string>} - AI response text
 */
exports.askGemini = async (messages) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: "You are the official AI assistant for the Kindred Relief Network platform. Kindred Relief Network is a community-driven disaster relief and volunteer coordination platform. Users can create campaigns (events), volunteer for them, and coordinate community management. You are here to help users navigate the platform, provide general information about volunteering and community support, and encourage positive engagement. Your primary goals: 1. Provide accurate information about how community platforms like this generally work. 2. Be helpful, encouraging, and guide the user toward donating or volunteering on the platform. 3. You do not have access to real-time campaign data, so if asked about specific active campaigns, kindly advise the user to check the 'Events' or 'Feed' pages on the platform. Tone: Professional, compassionate, and community-focused."
    });

    // Convert chat history to Gemini format (user/model roles)
    // IMPORTANT: Gemini history must alternate and start with a 'user' role.
    let history = [];
    let historyMessages = messages.slice(0, -1);
    
    // Find the first 'user' message to start history correctly for Gemini
    const firstUserIndex = historyMessages.findIndex(msg => msg.role === "user");
    if (firstUserIndex !== -1) {
      history = historyMessages.slice(firstUserIndex).map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));
    }

    const chat = model.startChat({
      history: history
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    
    return response.text();

  } catch (err) {
    console.error("Gemini AI Integration Error Detail:", err);
    throw new Error(err.message || "Gemini AI failed to process the request. Please try again later.");
  }
};
