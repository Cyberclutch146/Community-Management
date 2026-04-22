const Campaign = require('../../campaign_model');

/**
 * @desc    Create a new campaign
 * @route   POST /api/campaigns
 * @access  Private
 */
exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);

    res.status(201).json({
      success: true,
      data: campaign // Mongoose toJSON will handle _id -> id conversion
    });
  } catch (err) {
    console.error('Error creating campaign:', err.message);
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error'
    });
  }
};

/**
 * @desc    Get all campaigns (paginated)
 * @route   GET /api/campaigns
 * @access  Public
 */
exports.getCampaigns = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const { organizerId } = req.query;

    const query = organizerId ? { organizerId } : {};

    const campaigns = await Campaign.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns
    });
  } catch (err) {
    console.error('Error fetching campaigns:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

/**
 * @desc    Get single campaign by ID
 * @route   GET /api/campaigns/:id
 * @access  Public
 */
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (err) {
    console.error('Error fetching campaign by ID:', err.message);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
