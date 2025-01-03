import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./env";

// Get the MySQL URL, fallback to the default if not available
const mysqlURL = DATABASE_URL || "mysql://root@localhost:3306/mydb";

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize(mysqlURL, {
  dialect: "mysql",
  logging: false, // Set to true if you want to log SQL queries
});

// Connect to the database
const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");
  } catch (error) {
    console.error("MySQL connection error:", error);
  }
};

export { connectDB, sequelize };
