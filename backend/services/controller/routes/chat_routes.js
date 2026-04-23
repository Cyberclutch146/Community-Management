const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../Chat_controller");

/**
 * @route   POST /api/chat
 * @desc    Chat with global Gemini AI assistant
 * @access  Public
 */
router.post("/", chatWithAI);

module.exports = router;
