import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

class JwtServices {
  // Static property for JWT secret, but no fallback function needed here
  private static jwtSecret: string;

  // Constructor to ensure instance of JwtServices class is not required for static methods
  constructor() {
    if (!JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }
    JwtServices.jwtSecret = JWT_SECRET; // Set static jwtSecret after validation
  }

  /**
   * Generate a JWT token
   * @param {Object} payload - The payload to be encoded into the token
   * @returns {string} - The generated JWT token
   */
  public generateToken(payload: object): string {
    if (!payload) {
      throw new Error("Payload is required to generate the token.");
    }

    try {
      // Sign the JWT with the payload and secret, with a configurable expiration time
      return jwt.sign(payload, JwtServices.jwtSecret, {
        expiresIn: JWT_EXPIRES_IN,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error generating JWT token: " + error.message);
      }
      throw new Error("Unknown error generating JWT token");
    }
  }

  /**
   * Verify the JWT token
   * @param {string} token - The JWT token to be verified
   * @returns {JwtPayload | string} - The decoded token payload if valid
   */
  public verifyToken(token: string): JwtPayload | string {
    if (!token) {
      throw new Error("Token is required to verify.");
    }

    try {
      // Verify the token using the JWT secret and return the decoded payload
      return jwt.verify(token, JwtServices.jwtSecret);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Invalid or expired token: " + error.message);
      }
      throw new Error("Unknown error verifying token");
    }
  }

  /**
   * Decode a JWT token without verification
   * @param {string} token - The JWT token to decode
   * @returns {JwtPayload | null} - The decoded token payload or null if invalid
   */
  public decodeToken(token: string): JwtPayload | null {
    if (!token) {
      throw new Error("Token is required to decode.");
    }

    try {
      // Decode the token without verifying it
      return jwt.decode(token) as JwtPayload | null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error decoding token: " + error.message);
      }
      throw new Error("Unknown error decoding token");
    }
  }
}

export default new JwtServices(); // Exporting as default
