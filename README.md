# StockRocks 2.0

## Description
StockRocks is a full-stack web application that allows users to track stock market data, manage a portfolio, and analyze financial trends using data from Yahoo Finance. The app integrates authentication, a PostgreSQL database, and an intuitive React-based UI to deliver a seamless experience for users looking to monitor and manage their stock investments.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Future Development](#future-development)
- [Links](#links)
- [License](#license)

## Features
- **User Authentication**: Secure login and registration using JWT authentication.
- **Stock Search & Tracking**: Search stocks using Yahoo Finance API and add them to a watchlist.
- **Portfolio Management**: Users can add, remove, and manage stocks in their personal portfolio.
- **Real-Time Data**: Fetches up-to-date stock market data for accurate insights.
- **Responsive UI**: Built with React and Bootstrap to ensure a seamless experience across all devices.

## Technologies Used
- **Front-End**:
  - React
  - React Router
  - Bootstrap
  - Vite (for bundling)
- **Back-End**:
  - Node.js
  - Express.js
  - PostgreSQL + Sequelize ORM
  - Yahoo Finance API
  - JWT Authentication
  - Bcrypt for password hashing
- **Deployment**:
  - Render (for hosting server & database)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- PostgreSQL
- A package manager (npm or yarn)

### Setup Instructions
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/StockRocks2.0.git
   cd StockRocks2.0
   ```
2. **Install Dependencies:**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. **Set Up Environment Variables:**
   - Create a `.env` file in the `server/` directory and add your PostgreSQL credentials and API keys.
   ```properties
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=5432

   # JWT Authentication Secret Key
   JWT_SECRET=your_jwt_secret_key

   # Yahoo Finance API Key (if required)
   YAHOO_API_KEY=your_yahoo_finance_api_key

   # Server Port Configuration
   PORT=5000
   ```
4. **Run the Application:**
   - Start the back-end server:
     ```bash
     cd server
     npm run dev
     ```
   - Start the front-end client:
     ```bash
     cd client
     npm run dev
     ```
5. **Access the App:**
   - Open `http://localhost:3000` in your browser.

## API Endpoints
### User Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive a JWT token

### Stock Data
- `GET /api/stocks/:symbol` - Retrieve stock data by ticker symbol
- `POST /api/stocks/watchlist` - Add a stock to the user's watchlist

### Portfolio Management
- `POST /api/portfolio/add` - Add a stock to the user's portfolio
- `DELETE /api/portfolio/remove/:id` - Remove a stock from the portfolio

## Future Development
- Implement real-time notifications for stock price changes.
- Expand portfolio analysis tools with historical data visualizations.
- Add social features for users to share insights and trends.

## Links
- **Live Application**: [https://stockrocks2-0-1.onrender.com/register]
- **GitHub Repository**: [https://github.com/Gastons2023/StockRocks2.0]

## License
This project is licensed under the MIT License.
