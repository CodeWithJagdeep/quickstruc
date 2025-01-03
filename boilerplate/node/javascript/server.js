const app = require("./app");
const { PORT } = require("./config/env");

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  // Optionally, you can add process.exit() here to gracefully shut down the app
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Optionally, you can add process.exit() here to gracefully shut down the app
});

app.listen(PORT, () => {
  console.log("working on Port", PORT);
});
