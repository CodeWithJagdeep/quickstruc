// config/mysqlConfig.js

const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./env");

const mysqlURL = DATABASE_URL || "mysql://root@localhost:3306/mydb";

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize(mysqlURL, {
  dialect: "mysql",
  logging: false, // Set to true if you want to log SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully!");
  } catch (error) {
    console.error("MySQL connection error:", error);
  }
};

module.exports = { connectDB, sequelize };
