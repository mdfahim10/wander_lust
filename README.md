# 🏨 WanderLust – Airbnb-Inspired Hotel Booking Platform

WanderLust is a full-stack hotel booking platform inspired by Airbnb, built using the MERN stack with EJS templating. The application allows users to explore hotel listings, create and manage their own listings, upload images, leave reviews, and securely authenticate using Passport.js.

🌐 **Live Demo:** https://wander-lust-c3mb.onrender.com/listings

📂 **GitHub Repository:** https://github.com/mdfahim10/wander_lust

---

## 📸 Preview

> Add screenshots of your application here.

- Home Page
- Hotel Listings
- Create Listing
- Listing Details
- Login & Signup

---

# ✨ Features

### 🔐 User Authentication
- Secure user registration and login
- Password hashing using Passport Local Mongoose
- Session-based authentication
- Logout functionality

### 🏨 Hotel Listings
- Create new hotel listings
- Edit existing listings
- Delete listings
- View all available listings
- View detailed listing information

### 📷 Image Upload
- Upload hotel images
- Cloudinary cloud storage integration
- Multer middleware for file uploads

### 🔍 Search & Filters
- Search hotels by:
  - Title
  - Location
  - Country
- Browse listings using category filters:
  - Trending
  - Rooms
  - Mountains
  - Pools
  - Beach
  - Arctic
  - Camping
  - Forest
  - Lakefront
  - Historical
  - City View
  - Cabins
  - Luxury
  - Farm Stay
  - Boats
  - Tree House

### ⭐ Reviews & Ratings
- Add reviews
- Give ratings
- Delete own reviews
- Authorization for review owners

### 🔒 Authorization
- Only logged-in users can create listings
- Only listing owners can edit/delete listings
- Only review authors can delete reviews

### ☁ Cloud Database
- MongoDB Atlas integration
- Connect-Mongo session store

### 📱 Responsive Design
- Mobile-friendly interface
- Bootstrap-powered responsive layout

---

# 🛠 Tech Stack

## Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS
- Font Awesome

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session

## Image Storage
- Cloudinary
- Multer
- Multer Storage Cloudinary

## Validation
- Joi

## Deployment
- Render

---

# 📂 Project Structure

```
wander_lust/
│
├── controllers/
├── models/
├── routes/
├── views/
│   ├── listings/
│   ├── users/
│   ├── layouts/
│   └── includes/
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── utils/
├── middleware.js
├── cloudConfig.js
├── schema.js
├── app.js
├── package.json
└── README.md
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/mdfahim10/wander_lust.git
```

Move into the project folder

```bash
cd wander_lust
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name

CLOUD_API_KEY=your_cloudinary_api_key

CLOUD_API_SECRET=your_cloudinary_api_secret
```

Run the application

```bash
node app.js
```

or

```bash
nodemon app.js
```

Visit

```
http://localhost:8080/listings
```

---

# 🔒 Environment Variables

| Variable | Description |
|-----------|-------------|
| ATLASDB_URL | MongoDB Atlas Connection String |
| SECRET | Express Session Secret |
| CLOUD_NAME | Cloudinary Cloud Name |
| CLOUD_API_KEY | Cloudinary API Key |
| CLOUD_API_SECRET | Cloudinary API Secret |

---

# 📌 Key Functionalities

- User Authentication
- Secure Authorization
- CRUD Operations
- RESTful Routes
- MVC Architecture
- Cloud Image Upload
- Session Management
- Server-side Validation
- Search Functionality
- Category Filtering
- Responsive Design

---

# 🚀 Future Improvements

- Online hotel booking
- Payment Gateway Integration
- Wishlist/Favorites
- Google Maps Integration
- Email Verification
- Password Reset
- Booking History
- User Profile Dashboard
- Admin Dashboard
- Dark Mode

---

# 👨‍💻 Developer

**Md Fahim**

Portfolio: https://mdfahimportfolio.netlify.app/

LinkedIn: https://www.linkedin.com/in/md-fahim-dev/

GitHub: https://github.com/mdfahim10

Email: *(Add your professional email here)*

---

# ⭐ Show Your Support

If you found this project useful, consider giving it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the MIT License.

---

### Thank you for visiting WanderLust! ✈️🏨