✅ Backend: https://malleshwara-constructions-1.onrender.com 
✅ Frontend: https://malleshwara-constructions-2.onrender.com  
# Malleshwara Constructions - Full-Stack Website

## 🏗️ Project Overview

A comprehensive business website for Malleshwara Constructions, featuring:
- **Frontend**: React.js with TypeScript, Tailwind CSS, and i18n (English/Kannada)
- **Backend**: Node.js with Express, MongoDB, JWT Authentication
- **Features**: Quote requests, testimonials, gallery management, admin dashboard

## 🚀 Features

### Public Features
- 🌐 **Multilingual Support** (English/Kannada)
- 📱 **Mobile Responsive Design**
- 💬 **WhatsApp Integration**
- 🗺️ **Google Maps Integration**
- 📝 **Quote Request System**
- ⭐ **Customer Testimonials**
- 🖼️ **Project Gallery**
- 📞 **Contact Information**

### Admin Features
- 🔐 **Secure Admin Login**
- 📊 **Dashboard with Analytics**
- 📋 **Quote Management**
- ✅ **Testimonial Moderation**
- 🖼️ **Gallery Content Management**
- 📈 **Statistics & Reports**

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React i18next** for internationalization
- **Shadcn/ui** for UI components
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Cloudinary** for image storage
- **Express Validator** for input validation
- **Helmet** for security
- **Rate Limiting** for API protection

## 📁 Project Structure

```
malleshwara-constructions/
├── src/                          # Frontend React application
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Page components
│   ├── services/               # API service layer
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── i18n.js                 # Internationalization config
├── server/                      # Backend Node.js application
│   ├── controllers/            # Route controllers
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── middleware/             # Custom middleware
│   ├── config/                 # Database configuration
│   └── server.js               # Main server file
├── public/                      # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd malleshwara-constructions
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd server
npm install
cd ..
```

4. **Environment Setup**

**Frontend (.env)**
```bash
cp .env.example .env
# Edit .env with your configuration
```

**Backend (server/.env)**
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and other configurations
```

5. **Database Setup**
- Create a MongoDB database (local or MongoDB Atlas)
- Update the `MONGO_URI` in `server/.env`

### Running the Application

1. **Start the Backend Server**
```bash
cd server
npm run dev
```

2. **Start the Frontend Development Server**
```bash
npm run dev
```

3. **Access the Application**
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:8080/admin

### Default Admin Credentials
- **Email**: admin@malleshwara.com
- **Password**: admin123

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Quotes
- `POST /api/quotes` - Create quote request
- `GET /api/quotes` - Get all quotes (Admin)
- `PUT /api/quotes/:id` - Update quote status (Admin)
- `DELETE /api/quotes/:id` - Delete quote (Admin)

### Testimonials
- `POST /api/testimonials` - Submit testimonial
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/testimonials/admin` - Get all testimonials (Admin)
- `PUT /api/testimonials/:id` - Update testimonial status (Admin)

### Gallery
- `POST /api/gallery` - Upload gallery item (Admin)
- `GET /api/gallery` - Get gallery items
- `PUT /api/gallery/:id` - Update gallery item (Admin)
- `DELETE /api/gallery/:id` - Delete gallery item (Admin)

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Vercel or Netlify
3. Set environment variables in the hosting platform

### Backend Deployment (Render/Railway)
1. Deploy the `server` folder to Render or Railway
2. Set environment variables
3. Ensure MongoDB connection is configured

### Environment Variables for Production
- Update `VITE_API_URL` to your backend URL
- Update `FRONTEND_URL` in backend to your frontend URL
- Configure MongoDB Atlas for production database
- Set up Cloudinary for image storage

## 🔧 Configuration

### MongoDB Collections
- `users` - Admin user accounts
- `quotes` - Quote requests from customers
- `testimonials` - Customer testimonials
- `galleryitems` - Gallery images and videos

### File Upload
- Images and videos are uploaded to Cloudinary
- Configure Cloudinary credentials in backend `.env`

### Email Notifications (Optional)
- Configure SMTP settings for email notifications
- Update email templates in controllers

## 🌍 Internationalization

The website supports English and Kannada languages:
- Language files: `src/i18n.js`
- Switch languages using the language toggle in header
- Add new languages by extending the i18n configuration

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet for security headers

## 📱 Mobile Responsiveness

- Fully responsive design using Tailwind CSS
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: contact@malleshwara.com
- Phone: +91 98765 43210
- WhatsApp: +91 98765 43210

---

**Built with ❤️ for Malleshwara Constructions**
=======
# Malleshwara-Constructions
