require("dotenv").config(); // Load environment variables from .env file

const config = {
  // -------------------------------
  // Server Configuration
  // -------------------------------
  PORT: process.env.PORT || 3000, // Port for the app to listen on
  NODE_ENV: process.env.NODE_ENV || "development", // Environment mode
  BASE_API_URL: process.env.BASE_API_URL || "", // Base API URL

  // -------------------------------
  // Database Configuration
  // -------------------------------

  DB_USER: process.env.DB_USER || "root", // Database username
  DB_HOST: process.env.DB_HOST || "localhost", // Database host
  DB_PORT: process.env.DB_PORT || 5432, // Database port (default PostgreSQL port)
  DB_PASSWORD: process.env.DB_PASSWORD || "", // Database password
  DB_NAME: process.env.DB_NAME || "mydb", // Database name
  DATABASE_URL:process.env.DATABASE_URL || "",
  // -------------------------------
  // JWT Configuration
  // -------------------------------
  JWT_SECRET: process.env.JWT_SECRET || "", // JWT Secret for token signing
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h", // JWT expiry time

  // -------------------------------
  // Mail Configuration
  // -------------------------------
  MAIL_HOST: process.env.MAIL_HOST || "", // SMTP server address
  MAIL_PORT: process.env.MAIL_PORT || 587, // SMTP server port (default to 587 if not provided)
  MAIL_USERNAME: process.env.MAIL_USERNAME || "", // Email username
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || "", // Email password
  MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "", // Name for outgoing emails
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS || "", // Sender address

  // -------------------------------
  // Security and Allowed Origins
  // -------------------------------
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000", // CORS allowed origins

  // -------------------------------
  // Logging Configuration
  // -------------------------------
  LOG_LEVEL: process.env.LOG_LEVEL || "info", // Log level for application

  // -------------------------------
  // Third-party Integrations
  // -------------------------------
  THIRD_PARTY_API_KEY: process.env.THIRD_PARTY_API_KEY || "", // Third-party API key (if any)

  // -------------------------------
  // Application Metadata
  // -------------------------------
  APP_NAME: process.env.APP_NAME || "MyApp", // Application name
  TIMEZONE: process.env.TIMEZONE || "UTC", // Timezone setting

  // -------------------------------
  // Docker Environment
  // -------------------------------
  DOCKER_ENV: process.env.DOCKER_ENV || "development", // Docker environment mode
};

module.exports = config;
