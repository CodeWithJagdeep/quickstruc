import winston from "winston";
import path from "path";
import { LOG_LEVEL } from "../config/env";

// Get log level from the environment
const logLevel = LOG_LEVEL || "info"; // Default to 'info' if not set

// Resolve the file path to the log file
const logFilePath = path.resolve(__dirname, "../logging/app.log"); // Using absolute path for the log file

// Create a custom logger
const logger = winston.createLogger({
  level: logLevel, // Use the log level from env variable
  format: winston.format.combine(
    winston.format.colorize(), // Colorize logs in console
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      // Console transport for logs
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: logFilePath }), // File transport to save logs using absolute path
  ],
});

export default logger;
