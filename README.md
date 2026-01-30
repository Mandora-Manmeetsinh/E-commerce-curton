# E-commerce Curtain Project

A full-stack MERN (MongoDB, Express, React, Node.js) application for an e-commerce platform specializing in curtains.

## Features

- **Storefront**: Browse products and view detailed product information.
- **Admin Dashboard**: Secure admin login to manage products (add, edit, delete).
- **Image Uploads**: Integrated with Cloudinary for product image storage.
- **Responsive Design**: Built with React and Tailwind CSS for a modern look.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router, React Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Cloudinary, JWT.

## Setup Instructions

### Prerequisites

- Node.js installed.
- MongoDB instance (local or Atlas).
- Cloudinary account for file storage.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e-commerce-curton
```

### 2. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory if needed (currently using backend proxy).
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## API Testing

The backend includes a test route at `http://localhost:5000/api/test` to verify connectivity.

## Project Structure

- `backend/`: Express server, MongoDB models, and API routes.
- `frontend/`: React application with Vite and Tailwind CSS.
