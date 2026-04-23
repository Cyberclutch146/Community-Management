const { askGemini } = require('../Gemini_services');

/**
 * @desc    Process AI chat interactions globally (session-only history)
 * @route   POST /api/chat
 * @access  Public
 */
exports.chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Messages array is required and must not be empty"
      });
    }

    // Call the Gemini service with the full session history
    const aiReply = await askGemini(messages);

    // Return the response to the client
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
