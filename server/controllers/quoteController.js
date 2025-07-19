const Quote = require('../models/Quote');
const { validationResult } = require('express-validator');

// Create new quote request
const createQuote = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const quote = new Quote(req.body);
    await quote.save();

    // TODO: Send email notification to admin
    // await sendQuoteNotification(quote);

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: { quote }
    });
  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating quote'
    });
  }
};

// Get all quotes (Admin only)
const getAllQuotes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      service,
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    if (priority) filter.priority = priority;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const quotes = await Quote.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Quote.countDocuments(filter);

    res.json({
      success: true,
      data: {
        quotes,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quotes'
    });
  }
};

// Get quote by ID
const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.json({
      success: true,
      data: { quote }
    });
  } catch (error) {
    console.error('Get quote by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quote'
    });
  }
};

// Update quote status
const updateQuoteStatus = async (req, res) => {
  try {
    const { status, notes, quotedAmount, followUpDate } = req.body;
    
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    if (status) quote.status = status;
    if (notes) quote.notes = notes;
    if (quotedAmount) quote.quotedAmount = quotedAmount;
    if (followUpDate) quote.followUpDate = followUpDate;

    await quote.save();

    res.json({
      success: true,
      message: 'Quote updated successfully',
      data: { quote }
    });
  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating quote'
    });
  }
};

// Delete quote
const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    await Quote.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Quote deleted successfully'
    });
  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting quote'
    });
  }
};

// Get quote statistics
const getQuoteStats = async (req, res) => {
  try {
    const stats = await Quote.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalQuotes = await Quote.countDocuments();
    const recentQuotes = await Quote.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      data: {
        statusStats: stats,
        totalQuotes,
        recentQuotes
      }
    });
  } catch (error) {
    console.error('Get quote stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

module.exports = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
  getQuoteStats
};