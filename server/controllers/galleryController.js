const GalleryItem = require('../models/GalleryItem');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create new gallery item
const createGalleryItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const galleryData = {
      ...req.body,
      uploadedBy: req.user._id
    };

    // If file is uploaded, handle Cloudinary upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'malleshwara-gallery',
        resource_type: 'auto'
      });

      galleryData.url = result.secure_url;
      galleryData.cloudinaryPublicId = result.public_id;
      galleryData.metadata = {
        fileSize: result.bytes,
        dimensions: {
          width: result.width,
          height: result.height
        },
        format: result.format
      };

      // Generate thumbnail for videos
      if (galleryData.type === 'video') {
        const thumbnailResult = await cloudinary.uploader.upload(result.secure_url, {
          resource_type: 'video',
          format: 'jpg',
          transformation: [{ width: 400, height: 300, crop: 'fill' }]
        });
        galleryData.thumbnailUrl = thumbnailResult.secure_url;
      } else {
        galleryData.thumbnailUrl = result.secure_url;
      }
    }

    const galleryItem = new GalleryItem(galleryData);
    await galleryItem.save();

    await galleryItem.populate('uploadedBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: { galleryItem }
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating gallery item'
    });
  }
};

// Get all gallery items (Public)
const getGalleryItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      type,
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;
    if (type) filter.type = type;
    if (featured === 'true') filter.isFeatured = true;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const galleryItems = await GalleryItem.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-cloudinaryPublicId -uploadedBy')
      .exec();

    const total = await GalleryItem.countDocuments(filter);

    res.json({
      success: true,
      data: {
        galleryItems,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get gallery items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching gallery items'
    });
  }
};

// Get all gallery items (Admin)
const getAllGalleryItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      type,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const galleryItems = await GalleryItem.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('uploadedBy', 'name email')
      .exec();

    const total = await GalleryItem.countDocuments(filter);

    res.json({
      success: true,
      data: {
        galleryItems,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get all gallery items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching gallery items'
    });
  }
};

// Update gallery item
const updateGalleryItem = async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    const allowedUpdates = ['title', 'description', 'category', 'location', 'projectDate', 'tags', 'isActive', 'isFeatured'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    Object.assign(galleryItem, updates);
    await galleryItem.save();

    res.json({
      success: true,
      message: 'Gallery item updated successfully',
      data: { galleryItem }
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating gallery item'
    });
  }
};

// Delete gallery item
const deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    // Delete from Cloudinary if exists
    if (galleryItem.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(galleryItem.cloudinaryPublicId);
    }

    await GalleryItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting gallery item'
    });
  }
};

// Get gallery statistics
const getGalleryStats = async (req, res) => {
  try {
    const categoryStats = await GalleryItem.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const typeStats = await GalleryItem.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalItems = await GalleryItem.countDocuments({ isActive: true });
    const featuredItems = await GalleryItem.countDocuments({ isActive: true, isFeatured: true });

    res.json({
      success: true,
      data: {
        categoryStats,
        typeStats,
        totalItems,
        featuredItems
      }
    });
  } catch (error) {
    console.error('Get gallery stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
};

module.exports = {
  createGalleryItem,
  getGalleryItems,
  getAllGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryStats
};