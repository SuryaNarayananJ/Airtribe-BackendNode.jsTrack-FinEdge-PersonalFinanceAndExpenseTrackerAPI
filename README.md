# FinEdge - Personal Finance & Expense Tracker API

FinEdge is a robust, secure, and highly-performant RESTful API backend for a personal finance tracker, built using Node.js, Express, and MongoDB.

This API allows users to create accounts, securely log their income and expenses, set monthly budget goals, and generate automated insights into their spending habits.

## 🚀 Features

- **User Authentication**: Secure registration and login flows using `bcrypt` password hashing and JSON Web Tokens (JWT).
- **Transaction Management**: Full CRUD operations for logging incomes and expenses, with strict input validation.
- **Budgeting**: Set static monthly goals and saving targets (`month_year`).
- **Analytics & Reporting**: View total balances and filter transactions by date or category.
- **Monthly Summaries**: Aggregates a user's budgets and actual transactions into a clean month-by-month dashboard view.
- **AI Smart Tips**: Automatically analyzes spending patterns and suggests personalized savings tips based on highest expense categories.
- **Advanced Architecture**: Built using a strict modular MVC pattern, delegating heavy logic to reusable Services and Utilities.
- **High Performance**: Features a custom in-memory caching mechanism with Time-to-Live (TTL) expiry to make heavy aggregation routes (like `/summary`) lightning fast.
- **Security**: Hardened with Global Error Handling, CORS, and IP-based Rate Limiting to prevent API abuse.
- **Persistence Logging**: Asynchronously logs all incoming API requests to a local `server.log` file using native `fs/promises`.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: bcrypt, jsonwebtoken, cors, express-rate-limit

## 📦 Setup & Installation

1. **Clone the repository** (or download the files).
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**: Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. **Run the Server**:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`.

## 📡 Core API Endpoints

All endpoints are prefixed with `/airtribe/v1`.

### Users
- `POST /users/register` - Create a new account
- `POST /users/login` - Login and receive a JWT token

### Transactions *(Requires JWT in Authorization header)*
- `POST /transactions` - Log a new income/expense
- `GET /transactions` - Fetch all (Supports `?category=`, `?startDate=`, `?endDate=`)
- `GET /transactions/:id` - Fetch single
- `PATCH /transactions/:id` - Update
- `DELETE /transactions/:id` - Delete

### Budgets & Summary *(Requires JWT)*
- `POST /budgets` - Set a budget goal for a specific `month_year`
- `GET /budgets/summary` - View aggregated actuals vs goals (Cached)

### Analytics *(Requires JWT)*
- `GET /analytics/balance` - View total income, total expense, and current balance
- `GET /analytics/tips` - Get an AI-generated smart tip based on spending habits

## 📝 License
ISC
