const nodeStructure = {
  dist: [],
  config: ["env.js"],
  controllers: ["AuthController.js"],
  logging: ["app.log"],
  middlewares: [
    "authMiddleware.js", // Middleware for JWT token validation
    "corsMiddleware.js",
    "globalErrorHandler.js",
    "rateLimiter.js",
  ],
  models: ["User.js"],
  routes: [
    "AuthRouter.js", // Authentication routes (login, register)
  ],
  services: [
    "EmailServices.js", // Authentication service
    "JwtServices.js", // User-related service
  ],
  utils: [
    "logger.js", // Utility for logging (Winston)
    "AppError.js", // Custom error handler
  ],
  public: {
    images: [],
    logos: [],
  },
  views: {},
  root: [
    "server.js", // Entry point of the application
    "app.js", // Application setup

    "package.json",
    // ".eslintrc.json",
    ".env",
    // ".prettierrc",
  ],
};

module.exports = { nodeStructure };
