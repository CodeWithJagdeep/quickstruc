import { Request, Response, NextFunction } from "express";
import JwtServices from "../services/JwtServices"; // Ensure the path is correct
import { JwtPayload } from "jsonwebtoken";

/**
 * Middleware to authenticate and authorize requests using JWT.
 * @param {Request} req - The request object from the client.
 * @param {Response} res - The response object to be sent back to the client.
 * @param {NextFunction} next - The function to pass control to the next middleware or route handler.
 * @returns {void}
 */
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
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
    const decoded = JwtServices.verifyToken(tokenWithoutBearer) as JwtPayload; // This ensures the token is valid
    res.locals.user = decoded; // Attach the decoded user info to the request object for use in other routes
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error during token verification:", err); // Log any errors for debugging
    return res.status(401).json({ message: "Unauthorized" }); // Return Unauthorized error
  }
};

export default authMiddleware;
