import { NextFunction, Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import hpp from "hpp";
import AuthRouter from "./routes/AuthRouter";
import path from "path";
import AppError from "./utils/AppError";
import { connectDB, sequelize } from "./config/mysqlConfig";
import rateLimitMiddleware from "./middlewares/rateLimiter";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import corsMiddleware from "./middlewares/corsMiddleware";

require("./models/User"); // This will load the User model and its associations

// Sync database and models
sequelize
  .sync({ force: false }) // Set force: true only in development to drop and recreate tables
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error: any) => {
    console.log("Please check if the database is connect or not");
    console.log("Error syncing database:", error);
  });

connectDB();

// Initialize Express app
const app = express();

app.use(rateLimitMiddleware);

// Middleware: Set security HTTP headers
app.use(helmet());

// Middleware: Prevent HTTP parameter pollution
app.use(hpp());

// Apply CORS middleware globally for all routes
app.use(corsMiddleware);

// Middleware: Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware: Body parsers (JSON and URL-encoded data)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(bodyParser.json());

// Middleware: Cookie parser
app.use(cookieParser());

// Middleware: Response compression
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", AuthRouter);
// Catch-all route for undefined endpoints
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export the app module
export default app;
