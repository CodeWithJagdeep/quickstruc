const clc = require("cli-color");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { promptUser } = require("./promptQuestions");
const { spinner } = require("../../util/spinner");
const { installDependencies } = require("../config/dependency");
const { executions } = require("../../util/Execuations");
const { createFolderStructure } = require("./createFolderStructure");
const { reactStructure } = require("../template/ReactStructure");
const { showFolderStructure } = require("../../util/conclusion");
const { nodeStructure } = require("../template/nodeStructure");

/**
 * Sets up a React project with optional TypeScript and predefined configurations.
 *
 * @param {string} answer- User responses from the prompt (e.g., framework, language preferences).
 *
 * @returns {Promise<void>} - A Promise that resolves when the setup is complete.
 */

async function handleNodeSetup(answer) {
  try {
    const platform = os.platform();
    const dependencies = [
      "bcrypt",
      "body-parser",
      "compression",
      "cookie-parser",
      "cors",
      "dotenv",
      "express",
      "express-mongo-sanitize",
      "express-rate-limit",
      "helmet",
      "hpp",
      "jsonwebtoken",
      "morgan",
      "nodemailer",
      "winston",
    ];
    const devDependencies = ["eslint", "nodemon"];

    if (answer.database === "PostgreSQL") {
      nodeStructure.config.push("postgresConfig.js");
      dependencies.push("mysql2", "sequelize", "pg");
    } else if (answer.database === "MySQL") {
      nodeStructure.config.push("mysqlConfig.js");
      dependencies.push("mysql2", "sequelize");
    } else {
      dependencies.push("mongoose");
      nodeStructure.config.push("mongoConfig.js");
    }
    if (answer.useDocker) {
      nodeStructure.root.push(
        "Dockerfile",
        "docker-compose.yml",
        ".dockerignore"
      );
    }
    if (answer.useTypeScript) {
      nodeStructure.root.push("tsconfig.json");
      devDependencies.push(
        "typescript",
        "ts-node",
        "@types/node",
        "@types/express",
        "@types/morgan",
        "@types/helmet",
        "@types/cors",
        "@types/body-parser",
        "@types/cookie-parser",
        "@types/hpp",
        "@types/compression",
        "@types/bcrypt",
        "@types/nodemailer",
        "@types/jsonwebtoken"
      );
    }

    let packageJson = {
      name: answer.appName, // Project name dynamically set
      version: "1.0.0", // Initial project version
      description: "A modern and scalable application built with Node.js", // Add a meaningful description
      main: answer.useTypeScript ? "dist/index.js" : "server.js", // Entry point for TypeScript or JavaScript
      scripts: {
        start: answer.useTypeScript ? "ts-node server.ts" : "node server.js", // Use dist/index.js for TypeScript, server.js for JavaScript
        dev: answer.useTypeScript
          ? "nodemon --exec ts-node server.ts"
          : "nodemon server.js", // Dev script for TypeScript or JavaScript
        build: answer.useTypeScript
          ? "tsc --build"
          : "echo 'Build step not required for JS'",
        lint: "eslint . --fix",
        format: "prettier --write .",
        test: "jest",
        ...(answer.useDocker && {
          docker: platform.startsWith("linux")
            ? "docker compose up --build"
            : "docker-compose up --build",
        }),
      },
      keywords: [],
    };

    // Check if the user selected TypeScript and testing tool
    if (answer.language === "TypeScript") {
      // Add TypeScript-related dependencies
      devDependencies.push("typescript", "@types/node");

      // Check the selected testing tool
      if (answer.testingTools === "Jest") {
        packageJson.scripts.test = "jest";
        devDependencies.push("jest", "@types/jest", "ts-jest");
      } else if (answer.testingTools === "Mocha") {
        packageJson.scripts.test = "mocha --require ts-node/register";
        devDependencies.push(
          "mocha",
          "chai",
          "ts-node",
          "@types/mocha",
          "@types/chai"
        );
      } else if (answer.testingTools === "Chai") {
        // Chai is usually used with Mocha, so include it with Mocha configuration
        packageJson.scripts.test = "mocha --require ts-node/register";
        devDependencies.push(
          "chai",
          "mocha",
          "ts-node",
          "@types/chai",
          "@types/mocha"
        );
      } else if (answer.testingTools === "Supertest") {
        packageJson.scripts.test = "jest"; // Assuming you're using Jest with Supertest
        devDependencies.push("jest", "@types/jest", "ts-jest", "supertest");
      } else if (answer.testingTools === "Cypress") {
        packageJson.scripts.test = "cypress open";
        devDependencies.push("cypress");
      }
    } else {
      // For non-TypeScript projects, add dependencies without TypeScript-related packages
      if (answer.testingTools === "Jest") {
        packageJson.scripts.test = "jest";
        devDependencies.push("jest");
      } else if (answer.testingTools === "Mocha") {
        packageJson.scripts.test = "mocha";
        devDependencies.push("mocha", "chai");
      } else if (answer.testingTools === "Chai") {
        packageJson.scripts.test = "mocha";
        devDependencies.push("chai", "mocha");
      } else if (answer.testingTools === "Supertest") {
        packageJson.scripts.test = "jest"; // Assuming you're using Jest with Supertest
        devDependencies.push("jest", "supertest");
      } else if (answer.testingTools === "Cypress") {
        packageJson.scripts.test = "cypress open";
        devDependencies.push("cypress");
      }
    }

    console.log("\n");
    console.log(clc.green("Installing dependencies:"));
    dependencies.forEach((dep) => console.log(clc.cyan(`- ${dep}`)));

    console.log(clc.green("\nInstalling devDependencies:"));
    devDependencies.forEach((devDep) => console.log(clc.cyan(`- ${devDep}`)));

    // Ask for permission to proceed with setup
    let permissions = await promptUser([
      {
        type: "confirm",
        name: "proceed",
        message: "ok to proceed?",

        default: true,
      },
    ]);

    // Start the spinner while the setup is ongoing
    projectSetUp = spinner("Setting up Node project...");
    // If the user confirms, proceed with project setup
    if (permissions.proceed) {
      const projectDir = path.join(process.cwd(), answer.appName);
      const boilerplatePath = path.join(
        __dirname,
        "../..",
        "boilerplate",
        "node",
        `${answer.useTypeScript ? "typescript" : "javascript"}`
      );
      const root = path.join(process.cwd(), answer.appName);

      // Create the folder structure in the new project
      await createFolderStructure(
        projectDir,
        nodeStructure,
        boilerplatePath,
        answer,
        root
      );
      fs.writeFileSync(
        path.join(projectDir, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );
      // Install the required dependencies and dev dependencies
      await installDependencies(answer.appName, dependencies, devDependencies);

      // Show the folder structure for the user
      await showFolderStructure(answer);

      // Stop the spinner when the setup is complete
      clearInterval(projectSetUp);
    }
  } catch (error) {
    console.error(clc.red(error));
    process.exit(1);
  }
}

module.exports = { handleNodeSetup };
