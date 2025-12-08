# NodeJS Generic CRUD Functionality

A robust Node.js API built with TypeScript that provides generic CRUD (Create, Read, Update, Delete) operations for users and products, along with authentication features.

## Features

### Authentication

- User login with JWT token generation
- Secure logout with token blacklisting
- Token refresh functionality
- Password hashing using bcryptjs

### CRUD Operations

- **Users**: Full CRUD operations (Create, Read, Update, Delete)
- **Products**: Full CRUD operations with user association
- Generic reusable controller for easy extension to other entities
- Search functionality for both users and products

### Security & Middleware

- JWT token authentication middleware
- Token blacklist checking for logout security
- Helmet for security headers
- Input validation using express-validator
- Error handling middleware

### Additional Features

- Error logging
- Environment-based configuration
- TypeScript for type safety
- MongoDB integration with Mongoose

## Technologies Used

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, Helmet
- **Validation**: express-validator
- **Development**: ts-node-dev

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd NodeJS_Generic_CRUD_functionality
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/genericNodeApp
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
```

4. Start the development server:

```bash
npm run dev
```

5. For production build:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout (requires authentication)
- `POST /api/auth/refresh` - Refresh access token

### User Routes (`/api/users`)

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/search` - Search users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

### Product Routes (`/api/product`)

- `POST /api/product` - Create a new product (requires authentication)
- `GET /api/product` - Get all products
- `GET /api/product/products/search` - Search products

## Usage

### Authentication Example

```javascript
// Login
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const data = await response.json();
// Returns: { accessToken, refreshToken, user }
```

### CRUD Operations Example

```javascript
// Create User
const response = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  }),
});

// Get All Users
const users = await fetch("/api/users");
const usersData = await users.json();
```

## Project Structure

```
src/
├── app.ts              # Main Express app setup
├── server.ts           # Server entry point
├── config/
│   ├── db.ts           # Database connection
│   └── redis.ts        # Redis configuration
├── controllers/
│   ├── crudController.ts   # Generic CRUD controller
│   └── userController.ts   # User-specific controller
├── models/
│   ├── User.ts         # User model
│   └── ProductModel.ts # Product model
├── routes/
│   ├── authRoutes.ts   # Authentication routes
│   ├── UserRoutes.ts   # User CRUD routes
│   └── ProductRoutes.ts # Product CRUD routes
├── middlewares/
│   ├── authenticateToken.ts  # JWT authentication
│   ├── CheckBlacklist.ts     # Token blacklist check
│   └── errorHandler.ts       # Error handling
├── utils/
│   └── redisClient.ts  # Redis client setup
└── validators/
    └── userValidator.ts # Input validation rules
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
