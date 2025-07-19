const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['fencing', 'construction', 'catering', 'materials', 'other']
  },
  location: {
    type: String,
    trim: true
  },
  projectDate: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cloudinaryPublicId: {
    type: String
  },
  metadata: {
    fileSize: Number,
    dimensions: {
      width: Number,
      height: Number
    },
    format: String
  }
}, {
  timestamps: true
});

// Index for better query performance
galleryItemSchema.index({ category: 1, isActive: 1 });
galleryItemSchema.index({ isFeatured: 1, createdAt: -1 });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);