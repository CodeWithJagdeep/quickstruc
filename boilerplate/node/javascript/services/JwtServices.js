// jwtServices.js

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/env");

class JwtServices {
  // Static property for JWT secret
  static jwtSecret = JWT_SECRET;

  // Constructor to ensure instance of JwtServices class is not required for static methods
  constructor() {
    if (!JwtServices.jwtSecret) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }
  }

  /**
   * Generate a JWT token
   * @param {Object} payload - The payload to be encoded into the token
   * @returns {string} - The generated JWT token
   */
  generateToken(payload) {
    if (!payload) {
      throw new Error("Payload is required to generate the token.");
    }

    try {
      // Sign the JWT with the payload and secret, with a 1 hour expiration time
      return jwt.sign(payload, JwtServices.jwtSecret, {
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (error) {
      throw new Error("Error generating JWT token: " + error.message);
    }
  }

  /**
   * Verify the JWT token
   * @param {string} token - The JWT token to be verified
   * @returns {Object} - The decoded token payload if valid
   */
  verifyToken(token) {
    if (!token) {
      throw new Error("Token is required to verify.");
    }

    try {
      // Verify the token using the JWT secret and return the decoded payload
      return jwt.verify(token, JwtServices.jwtSecret);
    } catch (error) {
      throw new Error("Invalid or expired token: " + error.message);
    }
  }

  /**
   * Decode a JWT token without verification
   * @param {string} token - The JWT token to decode
   * @returns {Object} - The decoded token payload
   */
  decodeToken(token) {
    if (!token) {
      throw new Error("Token is required to decode.");
    }

    try {
      // Decode the token without verifying it
      return jwt.decode(token);
    } catch (error) {
      throw new Error("Error decoding token: " + error.message);
    }
  }
}

module.exports = new JwtServices();
