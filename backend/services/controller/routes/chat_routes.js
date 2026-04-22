const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../Chat_controller");

/**
 * @route   POST /api/chat/:campaignId
 * @desc    Chat with Gemini AI about a specific campaign
 * @access  Public
 */
router.post("/:campaignId", chatWithAI);

module.exports = router;
