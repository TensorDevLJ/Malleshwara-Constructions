const Testimonial = require('../models/Testimonial');
const { validationResult } = require('express-validator');

// Create new testimonial
const createTestimonial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const testimonial = new Testimonial(req.body);
    await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial submitted successfully. It will be reviewed before publication.',
      data: { testimonial }
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating testimonial'
    });
  }
};

// Get approved testimonials (Public)
const getApprovedTestimonials = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      service,
      rating,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { status: 'approved' };
    if (service) filter.service = service;
    if (rating) filter.rating = { $gte: parseInt(rating) };
    if (featured === 'true') filter.isFeatured = true;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const testimonials = await Testimonial.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-adminNotes -approvedBy')
      .exec();

    const total = await Testimonial.countDocuments(filter);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get approved testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching testimonials'
    });
  }
};

// Get all testimonials (Admin only)
const getAllTestimonials = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      service,
      rating,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    if (rating) filter.rating = { $gte: parseInt(rating) };

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const testimonials = await Testimonial.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('approvedBy', 'name email')
      .exec();

    const total = await Testimonial.countDocuments(filter);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get all testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching testimonials'
    });
  }
};

// Update testimonial status (Admin only)
const updateTestimonialStatus = async (req, res) => {
  try {
    const { status, adminNotes, isVerified, isFeatured } = req.body;
    
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    if (status) {
      testimonial.status = status;
      if (status === 'approved') {
        testimonial.approvedAt = new Date();
        testimonial.approvedBy = req.user._id;
      }
    }
    
    if (adminNotes !== undefined) testimonial.adminNotes = adminNotes;
    if (isVerified !== undefined) testimonial.isVerified = isVerified;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured;

    await testimonial.save();

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: { testimonial }
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating testimonial'
    });
  }
};

// Delete testimonial (Admin only)
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting testimonial'
    });
  }
};

// Get testimonial statistics
const getTestimonialStats = async (req, res) => {
  try {
    const stats = await Testimonial.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const ratingStats = await Testimonial.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    const averageRating = await Testimonial.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          totalCount: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        statusStats: stats,
        ratingStats,
        averageRating: averageRating[0] || { avgRating: 0, totalCount: 0 }
      }
    });
  } catch (error) {
    console.error('Get testimonial stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

module.exports = {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
  getTestimonialStats
};