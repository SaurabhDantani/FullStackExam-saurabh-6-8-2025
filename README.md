# MERN Stack E-Commerce Web Application

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript.

## Features

- User authentication and authorization
- Product catalog with categories
- Shopping cart functionality
- Order management
- Admin dashboard
- Responsive design
- Real-time updates
- Secure payment integration

## Tech Stack

### Frontend
- Next.js 15.3.3
- React 19
- TypeScript
- TailwindCSS
- Axios for API calls
- React Toastify for notifications

### Backend
- Node.js with Express
- TypeScript
- TypeORM for database operations
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services
- Passport.js for authentication strategies

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add necessary environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.example.env` and configure your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

4. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

## Testing

The project includes comprehensive test coverage for critical features, particularly authentication. Tests are written using Jest and Supertest.

### Running Tests

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run all tests:
```bash
npm test
```

3. Run tests in watch mode:
```bash
npm run test:watch
```

4. Generate test coverage report:
```bash
npm run test:coverage
```

### Test Structure

The test suite is organized into the following categories:

#### Authentication Tests
- User Registration
  - Successful registration
  - Duplicate email handling
- User Login
  - Successful login
  - Invalid credentials handling
  - Non-existent user handling
- User Profile
  - Profile retrieval with valid token
  - Unauthorized access handling
  - Invalid token handling

### Test Coverage

The test suite focuses on critical features and includes:
- Unit tests for authentication logic
- Integration tests for API endpoints
- Error handling and edge cases
- Database operations
- Token validation

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # Reusable components
│   ├── lib/          # Utility functions and configurations
│   ├── styles/       # Global styles
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
└── package.json
```

### Backend Structure
```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── utils/        # Utility functions
│   └── __tests__/    # Test files
└── package.json
```

## 🔧 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build TypeScript files
- `npm run start` - Start production server
- `npm run migration:run` - Run database migrations
- `npm run schema:sync` - Sync database schema
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product (Admin)
- PUT `/api/products/:id` - Update product (Admin)
- DELETE `/api/products/:id` - Delete product (Admin)

### Orders
- GET `/api/orders` - Get user orders
- POST `/api/orders` - Create new order
- GET `/api/orders/:id` - Get order details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their amazing tools and libraries
