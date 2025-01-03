const cors = require("cors");
const { ALLOWED_ORIGINS } = require("../config/env");

const corsMiddleware = (req, res, next) => {
  const corsOptions = {
    origin: ALLOWED_ORIGINS, // Allow specific origin(s) or all origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
    credentials: true, // Whether to allow credentials (cookies, etc.)
    preflightContinue: false, // Whether to pass the CORS request to the next handler
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
  };

  // Use the cors middleware with options
  cors(corsOptions)(req, res, next);
};

module.exports = corsMiddleware;
