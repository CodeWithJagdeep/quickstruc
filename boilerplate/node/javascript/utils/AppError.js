class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent class constructor (Error)
    this.statusCode = statusCode || 500; // Default status code is 500 (Internal Server Error)
    this.isOperational = true; // Flag for operational errors (non-technical errors)
    Error.captureStackTrace(this, this.constructor); // Captures the stack trace
  }
}

module.exports = AppError;
