const JwtServices = require("../services/JwtServices"); // Make sure path is correct

/**
 * Middleware to authenticate and authorize requests using JWT.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to be sent back to the client.
 * @param {Function} next - The function to pass control to the next middleware or route handler.
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]; // Retrieve the token from the Authorization header

  // If no token is provided in the request
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }); // Return Unauthorized error
  }

  // Remove the 'Bearer ' prefix from the token if it exists
  const tokenWithoutBearer = token.startsWith("Bearer ")
    ? token.slice(7, token.length) // Remove 'Bearer ' prefix
    : token; // If no prefix, use the token as is

  try {
    // Verify the token using the JwtServices verifyToken method
    const decoded = JwtServices.verifyToken(tokenWithoutBearer); // This ensures the token is valid
    req.user = decoded; // Attach the decoded user info to the request object for use in other routes
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error during token verification:", err); // Log any errors for debugging
    return res.status(401).json({ message: "Unauthorized" }); // Return Unauthorized error
  }
};

module.exports = authMiddleware;
