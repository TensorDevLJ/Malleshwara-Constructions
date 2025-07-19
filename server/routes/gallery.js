const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const {
  createGalleryItem,
  getGalleryItems,
  getAllGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryStats
} = require('../controllers/galleryController');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Gallery item validation
const galleryValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Title must be between 2 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  body('type')
    .isIn(['image', 'video'])
    .withMessage('Type must be either image or video'),
  body('category')
    .isIn(['fencing', 'construction', 'catering', 'materials', 'other'])
    .withMessage('Please select a valid category'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be less than 100 characters')
];

// Routes
router.post('/', authMiddleware, adminMiddleware, upload.single('file'), galleryValidation, createGalleryItem);
router.get('/', getGalleryItems);
router.get('/admin', authMiddleware, adminMiddleware, getAllGalleryItems);
router.get('/stats', authMiddleware, adminMiddleware, getGalleryStats);
router.put('/:id', authMiddleware, adminMiddleware, updateGalleryItem);
router.delete('/:id', authMiddleware, adminMiddleware, deleteGalleryItem);

module.exports = router;