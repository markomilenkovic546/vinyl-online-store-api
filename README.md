# Vinyl Online Store - REST API

 REST API built with **Express.js** and **MongoDB** for an online vinyl record store. It includes key e-commerce features.


## Features
- **User Registration**: Register new users with input validation.
- **User Login**: Authenticate users with JWT stored as http-only cookies.
- **Profile Management**: Edit user profiles securely.
- **Password Reset**: Reset passwords with token-based verification.
- **Address Book**: Save, update, and manage user addresses.
- **Product Catalog**: Browse vinyl products with filtering, sorting, and pagination.
- **Shopping Cart**: Manage items in the shopping cart.

## Technologies Used
- **Express.js** - Backend framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Joi** - Data validation
- **Mongoose** - MongoDB object modeling and schema management
- **Multer** - File upload handling (for profile pictures or other assets)
- **Playwright** - API integration testing
- **Faker.js** - Data generation for testing
- **GitHub Actions** - CI/CD pipeline

## Project Structure
The project is organized in a modular structure with separate files and folders for key components:
- **controllers/** - Handles the incoming HTTP requests and directs them to the appropriate services.
- **routes/** - Defines API endpoint routes and applies relevant middleware.
- **models/** - Defines MongoDB schemas and models using **Mongoose**.
- **services/** - Contains the core business logic and acts as a layer between controllers and database operations.
- **middlewares/** - Middleware functions, including authentication and input validation.
- **dto/** - Data Transfer Object (DTO) classes for sanitizing and structuring incoming and outgoing data.


## Testing & GitHub Actions Workflow
The project includes automated API integration tests using **Playwright**. These tests cover critical API endpoints and leverage **Faker.js** to generate realistic test data, simulating a variety of input scenarios.

### GitHub Actions CI/CD Workflow
A GitHub Actions workflow is implemented to:
1. Start the server locally.
2. Run Playwright integration tests to validate functionality on code changes.

The workflow triggers automatically on:
- **Push events** to the `dev` branch.
- **Pull requests** to the `main` branch.

### Steps to Run Locally
1. Clone the repo: `npm clone <repo url>`
2. Install dependencies: `npm install`
3. Sign in to MongoDB Atlasand create a new cluster and database. Obtain your connection string for the database.
4. Add `.env` file
5. Add env variables
Example:
`MONGO_URL = <url example>
PORT = 3001
JWT_SECRET = <secret>
CLIENT_ORIGIN = <client app origin>
BASE_URL = "http://localhost:3000"`
6. Run the server: `npm run dev`
    



