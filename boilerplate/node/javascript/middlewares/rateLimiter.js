/**
 * Rate limit middleware to limit requests from a single IP.
 * This middleware allows a maximum of 100 requests per 15 minutes.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function to call if rate limit is not exceeded.
 * @returns {void} - If the limit is not exceeded, it passes control to the next middleware.
 */
const { rateLimit } = require("express-rate-limit");

// Create a rate limit middleware to allow 100 requests per 15 minutes from a single IP
const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: "Too many requests from this IP, please try again after 15 minutes.", // Custom message
  standardHeaders: true, // Include rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = rateLimitMiddleware;
