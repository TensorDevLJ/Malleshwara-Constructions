# 🚀 Deployment Guide - Malleshwara Constructions Website

## Overview
This guide covers deploying the full-stack Malleshwara Constructions website with:
- **Frontend**: React app on Vercel/Netlify
- **Backend**: Node.js API on Render/Railway
- **Database**: MongoDB Atlas

## 📋 Pre-Deployment Checklist

### 1. Environment Setup
- [ ] MongoDB Atlas account created
- [ ] Cloudinary account for image storage
- [ ] Domain name (optional)
- [ ] Email service for notifications (optional)

### 2. Code Preparation
- [ ] All environment variables configured
- [ ] Production builds tested locally
- [ ] Database seeded with initial data
- [ ] API endpoints tested

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)

### Step 2: Configure Database
1. **Create Database User**:
   - Go to Database Access
   - Add new database user
   - Set username/password
   - Grant read/write permissions

2. **Configure Network Access**:
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow from anywhere)
   - Or add specific IPs for better security

3. **Get Connection String**:
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Step 3: Seed Database
```bash
cd server
npm run seed
```

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend
1. **Create `render.yaml` in server folder**:
```yaml
services:
  - type: web
    name: malleshwara-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

### Step 2: Deploy to Render
1. Go to [Render](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service
4. Select the `server` folder
5. Configure environment variables:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/malleshwara
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ADMIN_EMAIL=admin@malleshwara.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=https://your-frontend-domain.com
```

6. Deploy and note the backend URL

### Alternative: Railway Deployment
1. Go to [Railway](https://railway.app)
2. Connect GitHub repository
3. Deploy from `server` folder
4. Add same environment variables
5. Note the generated URL

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. **Update environment variables**:
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_WHATSAPP_NUMBER=919876543210
VITE_COMPANY_NAME=Malleshwara Constructions
VITE_COMPANY_EMAIL=contact@malleshwara.com
VITE_COMPANY_PHONE=+919876543210
```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add environment variables in Vercel dashboard
5. Deploy and note the frontend URL

### Alternative: Netlify Deployment
1. Go to [Netlify](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Add environment variables
5. Deploy

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings
Update backend environment variable:
```env
FRONTEND_URL=https://your-actual-frontend-domain.com
```

### 2. Test All Features
- [ ] Website loads correctly
- [ ] Language switching works
- [ ] Quote form submission
- [ ] Testimonial submission
- [ ] Admin login
- [ ] Gallery display
- [ ] WhatsApp integration

### 3. Configure Custom Domain (Optional)
**For Vercel**:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records

**For Netlify**:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

## 📧 Email Configuration (Optional)

### Using Gmail SMTP
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Using SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Input validation in place
- [ ] Admin credentials changed from defaults

## 📊 Monitoring & Analytics

### 1. Error Monitoring
Consider adding services like:
- Sentry for error tracking
- LogRocket for user sessions
- Google Analytics for website analytics

### 2. Uptime Monitoring
- UptimeRobot for server monitoring
- Pingdom for performance monitoring

## 🚀 Performance Optimization

### Frontend
- [ ] Images optimized and compressed
- [ ] Lazy loading implemented
- [ ] Bundle size optimized
- [ ] CDN configured (automatic with Vercel/Netlify)

### Backend
- [ ] Database indexes created
- [ ] Response caching implemented
- [ ] File uploads optimized
- [ ] API rate limiting configured

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check FRONTEND_URL in backend
   - Verify API URL in frontend

2. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Check network access settings
   - Ensure database user has correct permissions

3. **File Upload Issues**:
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper MIME type handling

4. **Authentication Issues**:
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure admin user exists

### Debug Commands
```bash
# Check backend health
curl https://your-backend-url.com/api/health

# Test database connection
node -e "require('./server/config/db')()"

# Verify environment variables
echo $MONGO_URI
```

## 📞 Support

If you encounter issues during deployment:
1. Check the deployment logs
2. Verify all environment variables
3. Test API endpoints individually
4. Check database connectivity

---

**🎉 Congratulations! Your Malleshwara Constructions website is now live!**

Remember to:
- Monitor performance regularly
- Keep dependencies updated
- Backup your database
- Update content regularly through the admin panel