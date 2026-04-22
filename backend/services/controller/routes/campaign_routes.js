const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns, getCampaignById } = require('../Campaign_controller');

/**
 * @route   POST /api/campaigns
 * @desc    Create a new campaign
 * @access  Private
 */
router.post('/', createCampaign);

/**
 * @route   GET /api/campaigns
 * @desc    Get all campaigns
 * @access  Public
 */
router.get('/', getCampaigns);

/**
 * @route   GET /api/campaigns/:id
 * @desc    Get single campaign by ID
 * @access  Public
 */
router.get('/:id', getCampaignById);

module.exports = router;
