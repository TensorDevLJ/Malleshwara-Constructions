const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: [
      'Fence Installation',
      'Construction Materials',
      'Labor Services',
      'Wedding Catering',
      'Event Catering',
      'Consultation',
      'Other'
    ]
  },
  projectType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Event/Wedding']
  },
  budget: {
    type: String,
    enum: [
      'Under ₹50,000',
      '₹50,000 - ₹1,00,000',
      '₹1,00,000 - ₹2,50,000',
      '₹2,50,000 - ₹5,00,000',
      'Above ₹5,00,000'
    ]
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  notes: {
    type: String
  },
  quotedAmount: {
    type: Number
  },
  followUpDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
quoteSchema.index({ status: 1, createdAt: -1 });
quoteSchema.index({ phone: 1 });

module.exports = mongoose.model('Quote', quoteSchema);