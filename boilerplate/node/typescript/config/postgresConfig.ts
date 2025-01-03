// config/postgresConfig.js

import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./env";

const postgresURL =
  DATABASE_URL || "postgres://username:password@localhost:5432/mydb";

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize(postgresURL, {
  dialect: "postgres",
  logging: false, // Set to true if you want to log SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully!");
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
  }
};

export { connectDB, sequelize };
