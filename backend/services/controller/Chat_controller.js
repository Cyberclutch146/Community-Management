const Chat = require('../../chat_model');
const Campaign = require('../../campaign_model');
const { askGemini } = require('../Gemini_services');

/**
 * @desc    Process AI chat interactions for a specific campaign
 * @route   POST /api/chat/:campaignId
 * @access  Public (or Private depending on your auth middleware)
 */
exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const { campaignId } = req.params;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message content is required"
      });
    }

    // 1. Get campaign details to provide context to Gemini
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campaign not found"
      });
    }

    // 2. Get or create the chat history for this campaign
    // Note: You might want to also filter by userId if chats are private
    let chat = await Chat.findOne({ campaignId });

    if (!chat) {
      chat = await Chat.create({
        campaignId,
        messages: []
      });
    }

    // 3. Add the user's message to history
    chat.messages.push({
      role: "user",
      content: message
    });

    // 4. Call the Gemini service with updated history and campaign context
    const aiReply = await askGemini(chat.messages, campaign);

    // 5. Save the AI's response to history
    chat.messages.push({
      role: "assistant",
      content: aiReply
    });

    await chat.save();

    // 6. Return the response to the client
    res.status(200).json({
      success: true,
      reply: aiReply
    });

  } catch (err) {
    console.error("AI Chat Controller Error:", err.message);
    res.status(500).json({
      success: false,
      error: err.message || "An error occurred while processing your request with AI"
    });
  }
};
