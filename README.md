# Razorpay Integration Project

This project demonstrates a full-stack application integrating Razorpay for payments. It consists of a React frontend and a Node.js/Express backend.

## Features

- **Course Listing**: Browse available courses.
- **Payment Integration**: Secure payment processing using Razorpay.
- **Responsive Design**: Frontend built with React and TailwindCSS for a modern look.

## Tech Stack

### Frontend

- **React**: UI library.
- **Vite**: Build tool.
- **TailwindCSS**: Utility-first CSS framework.
- **Axios**: HTTP client.

### Backend

- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: ODM for MongoDB.
- **Razorpay**: Payment gateway SDK.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- A Razorpay Account (for API keys).

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd razorpay
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGODB_URI=<your-mongodb-uri>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:3000`.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## API Endpoints

- **GET /**: Health check.
- **GET /courses**: List all courses.
- **POST /payments/order**: Create a payment order.
- **POST /payments/verify**: Verify payment signature.


