const fs = require("fs");
const path = require("path");
const { cwd } = require("process");

/**
 * Recursively creates a folder structure and copies necessary files from a boilerplate.
 *
 * Recursively creates a folder structure and copies necessary files from a boilerplate.
 *
 * @param {string} basePath - The base path where the folder structure is created.
 * @param {Object} structure - The folder structure to be created, defined as a nested object.
 * @param {string} existedPath - The path to the existing boilerplate files to copy from.
 * @param {Object} answers - User responses from the prompt (e.g., framework, language preferences).
 * @param {string} rootPath - geting static Root path for root .
 */

function createFolderStructure(
  basePath,
  structure,
  existedPath,
  answers,
  rootPath
) {
  if (structure) {
    Object.keys(structure).forEach((key) => {
      const currentPath = path.join(basePath, key);
      const existedFilePath = path.join(existedPath, key);

      if (Array.isArray(structure[key])) {
        // Handle empty folders (if any)
        if (structure[key].length === 0) {
          if (!fs.existsSync(currentPath) && key !== "root") {
            fs.mkdirSync(currentPath, { recursive: true });
          }
        }

        // Handle "root" folder - special case for root-level files (e.g., Dockerfile)
        if (key === "root") {
          let sourceFile = path.join(
            __dirname,
            "../../",
            "boilerplate",
            answers.framework.toLowerCase(),
            answers.framework.toLowerCase() === "react" ? "src" : "",

            answers.framework.toLowerCase() === "node"
              ? answers.useTypeScript
                ? "typescript"
                : "javascript"
              : ""
          );
          structure[key].forEach((file) => {
            let fileExtension;

            // Determine file extension based on framework and TypeScript usage
            if (answers.framework.toLowerCase() === "react") {
              fileExtension = file.endsWith(".js")
                ? answers.useTypeScript
                  ? ".tsx"
                  : ".js"
                : path.extname(file);
            } else {
              fileExtension = file.endsWith(".js")
                ? answers.useTypeScript
                  ? ".ts"
                  : ".js"
                : path.extname(file);
            }

            const excludedFiles = ["Dockerfile", ".dockerignore", ".env"];
            if (excludedFiles.includes(file)) {
              fileExtension = ""; // Do not modify these files' extensions
            }
            const filePath = path.join(
              rootPath,
              file.replace(path.extname(file), fileExtension)
            );
            const existedFile = path.join(
              sourceFile,
              file.replace(path.extname(file), fileExtension)
            );

            // Ensure parent directory exists before copying files
            ensureParentDirectoryExists(filePath);

            if (!fs.existsSync(existedFile)) {
              console.log(`Existed file not found: ${existedFile}`);
            } else {
              fs.copyFileSync(existedFile, filePath);

              if (file == "app.js") {
                // Read the file and split it into lines
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const lines = fileContent.split("\n");
                if (
                  answers.database === "PostgreSQL" ||
                  answers.database === "MySQL"
                ) {
                  const dbConfig =
                    answers.database === "PostgreSQL"
                      ? "postgresConfig"
                      : "mysqlConfig";
                  lines[11] = answers.useTypeScript
                    ? `import { connectDB, sequelize } from "./config/${dbConfig}"`
                    : `const { connectDB, sequelize } = require("./config/${dbConfig}")`;
                } else {
                  lines[11] = answers.useTypeScript
                    ? `import { connectDB } from "./config/mongoConfig"`
                    : `const { connectDB } = require("./config/mongoConfig");`;
                  // Remove the lines from startLine to endLine
                  for (let i = 28; i >= 17; i--) {
                    lines.splice(i - 1, 1); // Remove the line (adjust for 0-based index)
                  }
                }
                // Join the lines back into a single string and write the file
                const updatedContent = lines.join("\n");
                fs.writeFileSync(filePath, updatedContent, "utf-8");
              }
              if (file == ".env") {
                let db_url;
                if (answers.database == "PostgreSQL") {
                  db_url = "postgresql://root:yourpassword@localhost:5432/mydb";
                } else if (answers.database == "MySQL") {
                  db_url = "mysql://root:yourpassword@localhost:3306/mydb";
                } else {
                  db_url = "";
                }
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const lines = fileContent.split("\n");
                lines[12] = `DATABASE_URL=${db_url}`;
                const updatedContent = lines.join("\n");
                fs.writeFileSync(filePath, updatedContent, "utf-8");
                console.log(`env updated`);
              }
              if (file == "docker-compose.yml") {
                dynamicDockerFile(filePath, "docker-compose.yml", answers);
              }
            }
          });
        } else {
          // Create folder if it does not exist and handle files inside it
          ensureParentDirectoryExists(currentPath);
          structure[key].forEach((file) => {
            let fileExtension;

            if (answers.framework.toLowerCase() === "react") {
              if (
                file === "Routes.js" ||
                currentPath.includes("pages") ||
                currentPath.includes("components")
              ) {
                fileExtension = file.endsWith(".js")
                  ? answers.useTypeScript
                    ? ".tsx"
                    : ".jsx"
                  : path.extname(file);
              } else {
                fileExtension = file.endsWith(".js")
                  ? answers.useTypeScript
                    ? ".ts"
                    : ".js"
                  : path.extname(file);
              }
            } else {
              fileExtension = file.endsWith(".js")
                ? answers.useTypeScript
                  ? ".ts"
                  : ".js"
                : path.extname(file);
            }
            const filePath = path.join(
              currentPath,
              file.replace(path.extname(file), fileExtension)
            );
            const existedFile = path.join(
              existedFilePath,
              file.replace(path.extname(file), fileExtension)
            );

            // Copy file if it does not exist, otherwise rename and replace the existing one
            if (!fs.existsSync(filePath)) {
              ensureParentDirectoryExists(filePath);
              fs.copyFileSync(existedFile, filePath);
            } else {
              const newFileName = `old_${Date.now()}_${file}`;
              const newFilePath = path.join(currentPath, newFileName);

              fs.renameSync(filePath, newFilePath);
              fs.copyFileSync(existedFile, filePath);
            }
            if (currentPath.includes("models")) {
              createUserDefineModel(currentPath, file, answers);
            }
            if (file.startsWith("AuthController")) {
              // Read the file and split it into lines
              const fileContent = fs.readFileSync(filePath, "utf-8");
              const lines = fileContent.split("\n");
              if (
                answers.database === "PostgreSQL" ||
                answers.database === "MySQL"
              ) {
                lines[
                  answers.useTypeScript ? 29 : 22
                ] = `let hasAccount = await User.findOne({ where: { email: email } });`;
                lines[
                  answers.useTypeScript ? 89 : 75
                ] = `let hasAccount = await User.findOne({ where: { email: email } });`;
              } else {
                lines[
                  answers.useTypeScript ? 29 : 22
                ] = `let hasAccount = await User.findOne({  email: email });`;
                lines[
                  answers.useTypeScript ? 89 : 75
                ] = `let hasAccount = await User.findOne({  email: email });`;
              }
              // Join the lines back into a single string and write the file
              const updatedContent = lines.join("\n");
              fs.writeFileSync(filePath, updatedContent, "utf-8");
            }
          });
        }
      } else if (typeof structure[key] === "object") {
        // If the structure item is an object, recursively create folder structure
        if (!fs.existsSync(currentPath) && key !== "root") {
          fs.mkdirSync(currentPath, { recursive: true });
        }
        createFolderStructure(
          currentPath,
          structure[key],
          existedFilePath,
          answers,

          rootPath
        );
      } else {
        // Log if the structure is malformed or doesn't match expected types
        console.log(`Unexpected structure at key: ${key}`, structure);
      }
    });
  } else {
    console.log("Structure is undefined or empty", structure);
  }
}

/**
 * Utility function to ensure that parent directories exist before performing file operations.
 *
 * @param {string} filePath - The file path for which the parent directory should be ensured.
 */

function ensureParentDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function createUserDefineModel(filePath, file, answer) {
  const baseModel = `
const bcrypt = require("bcrypt");

const passwordHashing = async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 16);
  }
};

const comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
`;

  let modelContent = "";
  if (answer.database === "PostgreSQL" || answer.database === "MySQL") {
    const dbConfig =
      answer.database === "PostgreSQL" ? "postgresConfig" : "mysqlConfig";
    modelContent = `${
      answer.useTypeScript
        ? `import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../config/${dbConfig}"; // Assuming mysqlConfig.ts is in the config directory

/**
 * User model represents a user in the system.
 */
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// User creation attributes (without the "id", "createdAt", and 'updatedAt" fields)
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  /**
   * Compares the provided password with the user's hashed password.
   * @param password - The password to be compared.
   * @returns - Returns true if the password matches, false otherwise.
   */
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Initialize the User model
User.init(
  {
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
  },
  {
    sequelize,
    modelName: "User",
  }
);

/**
 * Before creating a new user, hash the password using bcrypt.
 */
User.addHook("beforeCreate", async (user: User) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 16);
  }
});

export { User };
`
        : `${baseModel}
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/${dbConfig}");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

User.beforeCreate(passwordHashing);
User.prototype.comparePassword = comparePassword;

module.exports = { User };
    `
    }`;
  } else {
    modelContent = `import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define an interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the user schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    return next(err as Error);
  }
});

// Method to compare hashed password with a provided password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export  { User };
`;
  }

  // Ensure the directory exists
  const fullFilePath = path.join(filePath, "models");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  let fileExtension = "User.js".endsWith(".js")
    ? answer.useTypeScript
      ? ".ts"
      : ".js"
    : path.extname(file);
  const filePathToWrite = path.join(
    filePath,
    "User.js".replace(path.extname(file), fileExtension)
  );

  // Create the file at the specified filePath
  try {
    fs.writeFileSync(filePathToWrite, modelContent);
  } catch (err) {
    console.error("Error creating the file:", err);
  }
}

function dynamicDockerFile(filePath, file, answer) {
  // Dynamically create the Docker Compose file content
  let dockerFileContent = `version: '3.8'

services:
  app:
    build:
      context: .  # Use the current directory to build the image
      dockerfile: Dockerfile  # Use the Dockerfile defined above
    container_name: myapp-container
    ports:
      - "8000:8000"  # Expose port 8000 on the host to port 8000 in the container
    environment:
      - NODE_ENV=\${NODE_ENV}
      - PORT=\${PORT}
      - JWT_SECRET=\${JWT_SECRET}
      - JWT_EXPIRES_IN=\${JWT_EXPIRES_IN}
      - DATABASE_URL=\${DATABASE_URL}
      - DB_USER=\${DB_USER}
      - DB_PASSWORD=\${DB_PASSWORD}
      - MAIL_HOST=\${MAIL_HOST}
      - MAIL_PORT=\${MAIL_PORT}
      - MAIL_USERNAME=\${MAIL_USERNAME}
      - MAIL_PASSWORD=\${MAIL_PASSWORD}
      - MAIL_FROM_NAME=\${MAIL_FROM_NAME}
      - MAIL_FROM_ADDRESS=\${MAIL_FROM_ADDRESS}
      - LOG_LEVEL=\${LOG_LEVEL}
      - BASE_API_URL=\${BASE_API_URL}
      - DOCKER_ENV=\${DOCKER_ENV}
      - THIRD_PARTY_API_KEY=\${THIRD_PARTY_API_KEY}
      - APP_NAME=\${APP_NAME}
      - TIMEZONE=\${TIMEZONE}
    volumes:
      - .:/app  # Mount the current directory to /app inside the container
    depends_on:
      - db  # Assuming a db service is defined below

  ${
    answer.database !== "MongoDB"
      ? `
  db:
    ${
      answer.database === "PostgreSQL"
        ? `
    image: postgres:13  # Update to the desired PostgreSQL version
    container_name: mydb-container
    environment:
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
      POSTGRES_DB: \${DB_NAME}
    ports:
      - "5432:5432"  # Expose PostgreSQL port 5432
    volumes:
      - db_data:/var/lib/postgresql/data  # Persistent volume for PostgreSQL
    `
        : ""
    }
    ${
      answer.database === "MySQL"
        ? `
    image: mysql:8.0
    container_name: mydb-container
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_PASSWORD} 
      MYSQL_DATABASE: \${DB_NAME}  
    ports:
      - "3306:3306"  # Expose MySQL port 3306
    volumes:
      - db_data:/var/lib/mysql  # Persistent volume for MySQL
    `
        : ``
    }
  `
      : ""
  }
volumes:
  db_data:
    driver: local
  `;

  // Output the generated Docker Compose content to the file
  fs.writeFileSync(filePath, dockerFileContent);
}

module.exports = { createFolderStructure };
