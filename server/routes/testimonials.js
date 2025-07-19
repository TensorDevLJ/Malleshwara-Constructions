const express = require('express');
const { body } = require('express-validator');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
  getTestimonialStats
} = require('../controllers/testimonialController');

const router = express.Router();

// Testimonial validation
const testimonialValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('service')
    .isIn(['Fence Installation', 'Construction Materials', 'Labor Services', 'Wedding Catering', 'Event Catering', 'Other'])
    .withMessage('Please select a valid service'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Comment must be between 10 and 1000 characters'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be less than 100 characters')
];

// Routes
router.post('/', testimonialValidation, createTestimonial);
router.get('/', getApprovedTestimonials);
router.get('/admin', authMiddleware, adminMiddleware, getAllTestimonials);
router.get('/stats', authMiddleware, adminMiddleware, getTestimonialStats);
router.put('/:id', authMiddleware, adminMiddleware, updateTestimonialStatus);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTestimonial);

module.exports = router;