const AppError = require("../utils/AppError");

/**
 * Global error handler middleware for handling errors across the application.
 *
 * @param {Error} err - The error object that contains error details, including message, stack, status code, etc.
 * @param {Object} req - The request object, which contains information about the HTTP request, such as headers, body, and query parameters.
 * @param {Object} res - The response object, which is used to send a response back to the client.
 * @param {Function} next - The next middleware function, which can be called to pass control to the next middleware.
 */

const globalErrorHandler = (err, req, res, next) => {
  // Set the default status code if it's not set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log the error (for development or production)
  if (process.env.NODE_ENV === "development") {
    console.error("ERROR 💥:", err);
  } else {
    // Log detailed errors in production
    if (err.isOperational) {
      console.error("ERROR 💥:", err);
    } else {
      // Log the entire error stack for unknown errors
      console.error("ERROR 💥:", err.stack);
    }
  }

  // Send a response with the error details
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development mode
  });
};

module.exports = globalErrorHandler;
