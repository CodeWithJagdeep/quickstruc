// config/postgresConfig.js

const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = require("./env");

const postgresURL =
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}` ||
  "postgres://username:password@localhost:5432/mydb";
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

module.exports = { connectDB, sequelize };
