const express = require('express');
const { body } = require('express-validator');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuoteStatus,
  deleteQuote,
  getQuoteStats
} = require('../controllers/quoteController');

const router = express.Router();

// Quote validation
const quoteValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .trim()
    .matches(/^[+]?[0-9\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  body('service')
    .isIn(['Fence Installation', 'Construction Materials', 'Labor Services', 'Wedding Catering', 'Event Catering', 'Consultation', 'Other'])
    .withMessage('Please select a valid service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Routes
router.post('/', quoteValidation, createQuote);
router.get('/', authMiddleware, adminMiddleware, getAllQuotes);
router.get('/stats', authMiddleware, adminMiddleware, getQuoteStats);
router.get('/:id', authMiddleware, adminMiddleware, getQuoteById);
router.put('/:id', authMiddleware, adminMiddleware, updateQuoteStatus);
router.delete('/:id', authMiddleware, adminMiddleware, deleteQuote);

module.exports = router;