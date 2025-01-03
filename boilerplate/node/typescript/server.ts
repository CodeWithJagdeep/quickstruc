import app from "./app"; // Import your app instance
import { PORT } from "./config/env"; // Import the port from your config

// Type for the error object in case of unhandled rejection or uncaught exception
type ErrorEvent = Error & { code?: string };

// Handle unhandled promise rejections
process.on("unhandledRejection", (error: ErrorEvent) => {
  console.error("Unhandled Rejection:", error);
  // Gracefully shut down the application
  process.exit(1); // Exit the process with failure code
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: ErrorEvent) => {
  console.error("Uncaught Exception:", error);
  // Gracefully shut down the application
  process.exit(1); // Exit the process with failure code
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
