# Smart Inventory & Sales Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing inventory, sales, and reporting.

## Features
- **Authentication**: Signup and Login with JWT and role-based access (Admin/Staff).
- **Inventory Management**: Add, View, Edit, and Delete products.
- **Sales Management**: Record sales, automatically deducts stock, and tracks customers.
- **Admin Dashboard**: View total sales, product count, and low stock alerts.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas connection string

### 1. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` folder with the following content:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup
Navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Usage
1. Open the frontend URL.
2. Sign up for a new account (Select 'Admin' role for full access).
3. Log in.
4. Use the Dashboard to navigate to Inventory, Sales, or Reports.

## Technologies
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend**: React, Redux Toolkit, Tailwind CSS, Vite
