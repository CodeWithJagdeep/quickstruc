// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const AuthRouter = require("./routes/AuthRouter");
const path = require("path");
const AppError = require("./utils/AppError");
const { connectDB, sequelize } = require("./config/mysqlConfig");
const rateLimitMiddleware = require("./middlewares/rateLimiter");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const corsMiddleware = require("./middlewares/corsMiddleware");

require("./models/User.js"); // This will load the User model and its associations

// Sync database and models
sequelize
  .sync({ force: false }) // Set force: true only in development to drop and recreate tables
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.log("Error syncing database:", error);
  });

connectDB();

// Initialize Express app
const app = express();

app.use(rateLimitMiddleware);

// Middleware: Set security HTTP headers
app.use(helmet());

// Middleware: Prevent HTTP parameter pollution
app.use(hpp());


// Apply CORS middleware globally for all routes
app.use(corsMiddleware);

// Middleware: Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware: Body parsers (JSON and URL-encoded data)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(bodyParser.json());

// Middleware: Cookie parser
app.use(cookieParser());

// Middleware: Response compression
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", AuthRouter);
// Catch-all route for undefined endpoints
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export the app module
module.exports = app;
