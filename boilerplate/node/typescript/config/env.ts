import { config as dotenvConfig } from "dotenv";

// Load environment variables from .env file
dotenvConfig();

// -------------------------------
// Server Configuration
// -------------------------------
export const PORT: number = Number(process.env.PORT) || 3000; // Application port
export const NODE_ENV: string = process.env.NODE_ENV || "development"; // Environment: development, production, etc.
export const DOCKER_ENV: string = process.env.DOCKER_ENV || "development"; // Docker environment
export const BASE_API_URL: string | undefined = process.env.BASE_API_URL; // Base API URL for the app

// -------------------------------
// Database Configuration
// -------------------------------
export const DATABASE_URL: string | undefined = process.env.DATABASE_URL; // Full DB connection string

// -------------------------------
// JWT Configuration
// -------------------------------
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET; // Secret key for JWT
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1h"; // JWT token expiry time

// -------------------------------
// Mail Configuration
// -------------------------------
export const MAIL_HOST: string | undefined = process.env.MAIL_HOST; // Mail server host
export const MAIL_PORT: number | undefined = process.env.MAIL_PORT
  ? Number(process.env.MAIL_PORT)
  : undefined; // Mail server port
export const MAIL_USERNAME: string | undefined = process.env.MAIL_USERNAME; // Mail server username
export const MAIL_PASSWORD: string | undefined = process.env.MAIL_PASSWORD; // Mail server password
export const MAIL_FROM_NAME: string | undefined = process.env.MAIL_FROM_NAME; // Sender's name
export const MAIL_FROM_ADDRESS: string | undefined = process.env.MAIL_FROM_ADDRESS; // Sender's email address

// -------------------------------
// Security and Allowed Origins
// -------------------------------
export const ALLOWED_ORIGINS: string =
  process.env.ALLOWED_ORIGINS || "http://localhost:3000"; // Allowed CORS origins

// -------------------------------
// Logging Configuration
// -------------------------------
export const LOG_LEVEL: string = process.env.LOG_LEVEL || "info"; // Log level (info, debug, etc.)

// -------------------------------
// Third-party Integrations
// -------------------------------
export const THIRD_PARTY_API_KEY: string | undefined =
  process.env.THIRD_PARTY_API_KEY; // Third-party API key

// -------------------------------
// Application Metadata
// -------------------------------
export const APP_NAME: string = process.env.APP_NAME || "MyApp"; // Application name
export const TIMEZONE: string = process.env.TIMEZONE || "UTC"; // Default timezone

