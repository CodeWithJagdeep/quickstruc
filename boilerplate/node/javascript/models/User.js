// models/User.js

const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../config/mysqlConfig"); // Assuming mysqlConfig.js is in the config directory

/**
 * User model represents a user in the system.
 *
 * @property {number} id - The unique identifier of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The hashed password of the user.
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure usernames are unique
    validate: {
      notNull: {
        msg: "Username is required",
      },
      notEmpty: {
        msg: "Username cannot be empty",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure emails are unique
    validate: {
      notNull: {
        msg: "Email is required",
      },
      isEmail: {
        msg: "Please provide a valid email address",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Password is required",
      },
      notEmpty: {
        msg: "Password cannot be empty",
      },
      len: {
        args: [6, 100],
        msg: "Password must be at least 6 characters long",
      },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

/**
 * Before creating a new user, hash the password using bcrypt.
 *
 * @param {User} user - The user instance being created.
 */
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 16);
  }
});

/**
 * Compares the provided password with the user's hashed password.
 *
 * @param {string} password - The password to be compared.
 * @returns {Promise<boolean>} - Returns true if the password matches, false otherwise.
 */
User.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = { User };
