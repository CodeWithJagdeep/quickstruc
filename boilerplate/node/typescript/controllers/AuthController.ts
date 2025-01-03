import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import EmailServices from "../services/EmailServices";
import JwtServices from "../services/JwtServices";
import logger from "../utils/logger"; // Import the logger

class AuthController {
  constructor() {}

  /**
   * Creates a new user account after validating the input.
   * @param {Request} req - The request object containing user signup data.
   * @param {Response} res - The response object used to send back the response.
   * @param {NextFunction} next - The next middleware function in the stack.
   * @returns {Object} - A JSON response with a success or error message.
   */
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = req.body;

    try {
      // Check if a user with the provided email already exists
      let hasAccount = await User.findOne({ where: { email: email } });
      if (hasAccount) {
        logger.warn(`Account already exists with email: ${email}`); // Log a warning if account exists
        return res.status(401).json({
          status: "failed",
          message: "An account already exists with this email address.",
        });
      }

      // Create a new user
      const newUser = new User({
        username,
        email,
        password, // Assuming password is hashed in the User model via a pre-save hook
      });

      // Save the user to the database
      await newUser.save();

      // Generate JWT token after successful user creation
      let token = JwtServices.generateToken({
        id: newUser.id,
      });

      // Log successful user creation
      logger.info(`New user created: ${newUser.email}`);

      // Uncomment to send a welcome email
      // await EmailServices.sendWelcomeEmail(newUser.email, newUser.username);

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        token: token, // Send the token to the client
      });
    } catch (err) {
      logger.error("Error creating user:", err); // Log the error
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }

  /**
   * Handles user login by validating email and password.
   * @param {Request} req - The request object containing user login data.
   * @param {Response} res - The response object used to send back the response.
   * @param {NextFunction} next - The next middleware function in the stack.
   * @returns {Object} - A JSON response with a status message and JWT token on success.
   */
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, password } = req.body;

    try {
      // Await the result of the database query to check if user exists
      let hasAccount = await User.findOne({ where: { email: email } });

      // Check if the account exists
      if (hasAccount) {
        // Check if the password is valid
        const isPasswordValid = await hasAccount.comparePassword(password);
        if (!isPasswordValid) {
          logger.warn(`Failed login attempt for email: ${email}`); // Log failed login attempt
          return res.status(401).json({
            status: "error",
            message: "Invalid credentials",
          });
        }

        // Generate JWT token after successful login
        let token = JwtServices.generateToken({ data: hasAccount.id });

        // Log successful login
        logger.info(`User logged in successfully: ${hasAccount.email}`);

        return res.status(200).json({
          status: "success",
          token: token,
          user: hasAccount,
        });
      } else {
        logger.warn(`Account not found for email: ${email}`); // Log account not found
        return res.status(404).json({
          status: "error",
          message: "Account not found",
        });
      }
    } catch (error) {
      // Log error and send response in case of unexpected issues
      logger.error("Error during login:", error); // Log the error
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

export default new AuthController();
