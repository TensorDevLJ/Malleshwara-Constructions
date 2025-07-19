const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Quote = require('../models/Quote');
const Testimonial = require('../models/Testimonial');
const GalleryItem = require('../models/GalleryItem');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Quote.deleteMany({});
    await Testimonial.deleteMany({});
    await GalleryItem.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@malleshwara.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create sample quotes
    const sampleQuotes = [
      {
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@example.com',
        location: 'Bangalore, Karnataka',
        service: 'Fence Installation',
        projectType: 'Residential',
        budget: '₹1,00,000 - ₹2,50,000',
        message: 'Need boundary fencing for my residential property. Please provide quote.',
        status: 'pending'
      },
      {
        name: 'Priya Sharma',
        phone: '+91 87654 32109',
        email: 'priya@example.com',
        location: 'Mysore, Karnataka',
        service: 'Wedding Catering',
        projectType: 'Event/Wedding',
        budget: '₹2,50,000 - ₹5,00,000',
        message: 'Wedding catering for 300 guests. Traditional South Indian menu required.',
        status: 'contacted'
      },
      {
        name: 'Manjunath Reddy',
        phone: '+91 76543 21098',
        location: 'Hubli, Karnataka',
        service: 'Construction Materials',
        projectType: 'Commercial',
        budget: 'Above ₹5,00,000',
        message: 'Need quality stones and construction materials for commercial building.',
        status: 'quoted'
      }
    ];

    await Quote.insertMany(sampleQuotes);
    console.log('Sample quotes created');

    // Create sample testimonials
    const sampleTestimonials = [
      {
        name: 'Suresh Gowda',
        email: 'suresh@example.com',
        service: 'Fence Installation',
        rating: 5,
        comment: 'Excellent work quality and professional service. The team completed our boundary fencing project on time and within budget. Highly recommended!',
        location: 'Dharwad, Karnataka',
        status: 'approved',
        isVerified: true,
        approvedAt: new Date(),
        approvedBy: adminUser._id
      },
      {
        name: 'Lakshmi Devi',
        service: 'Labor Services',
        rating: 5,
        comment: 'Professional and skilled workers. They completed our home renovation project efficiently. Very satisfied with their work.',
        location: 'Mangalore, Karnataka',
        status: 'approved',
        isVerified: true,
        approvedAt: new Date(),
        approvedBy: adminUser._id
      },
      {
        name: 'Anita Kumari',
        service: 'Event Catering',
        rating: 4,
        comment: 'Great food and service for our corporate event. The team was professional and handled everything smoothly.',
        location: 'Bellary, Karnataka',
        status: 'pending'
      }
    ];

    await Testimonial.insertMany(sampleTestimonials);
    console.log('Sample testimonials created');

    // Create sample gallery items
    const sampleGalleryItems = [
      {
        title: 'Residential Boundary Fencing',
        description: 'Complete boundary fencing for residential property in Bangalore',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        category: 'fencing',
        location: 'Bangalore, Karnataka',
        projectDate: new Date('2024-01-15'),
        isActive: true,
        isFeatured: true,
        uploadedBy: adminUser._id
      },
      {
        title: 'Commercial Building Construction',
        description: 'Modern commercial building construction project',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
        category: 'construction',
        location: 'Mysore, Karnataka',
        projectDate: new Date('2024-02-10'),
        isActive: true,
        uploadedBy: adminUser._id
      },
      {
        title: 'Wedding Catering Setup',
        description: 'Traditional wedding catering arrangement for 500 guests',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
        category: 'catering',
        location: 'Mangalore, Karnataka',
        projectDate: new Date('2024-03-05'),
        isActive: true,
        uploadedBy: adminUser._id
      },
      {
        title: 'Quality Construction Materials',
        description: 'Premium quality stones and construction materials supply',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'materials',
        location: 'Dharwad, Karnataka',
        projectDate: new Date('2024-03-12'),
        isActive: true,
        uploadedBy: adminUser._id
      }
    ];

    await GalleryItem.insertMany(sampleGalleryItems);
    console.log('Sample gallery items created');

    console.log('✅ Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@malleshwara.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding
connectDB().then(() => {
  seedData();
});