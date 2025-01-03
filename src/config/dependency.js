const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const clc = require("cli-color");
const { executions } = require("../../util/Execuations");

/**
 * Installs dependencies and devDependencies for a React project and configures Tailwind CSS.
 *
 * @param {string} appName - The name of the React app.
 * @param {string[]} dependencies - List of regular dependencies to install.
 * @param {string[]} devDependencies - List of development dependencies to install.
 */
async function installDependencies(appName, dependencies, devDependencies) {
  try {
    // Install regular dependencies
    await executions(`cd ${appName} && npm install ${dependencies.join(" ")}`);
    // Install dev dependencies

    await executions(
      `cd ${appName} && npm install --save-dev ${devDependencies.join(" ")}`
    );
    if (dependencies.includes("tailwindcss")) {
      // Configure Tailwind CSS after dependencies are installed
      await configureTailwindCSS(appName);
    }
  } catch (error) {
    console.error("\n❌ Error while setting up modules:", error);
    process.exit(1);
  }
}

/**
 * Configures Tailwind CSS in the React project by generating configuration files and adding styles to index.css.
 *
 * @param {string} appName - The name of the React app.
 * @throws Will throw an error if Tailwind CSS configuration or file writing fails.
 */

async function configureTailwindCSS(appName) {
  try {
    // Initialize Tailwind CSS configuration
    await executions(`cd ${appName} && npx tailwindcss init -p`);

    // Define paths for Tailwind config and index.css
    const tailwindConfigPath = path.join(appName, "tailwind.config.js");
    const indexCssPath = path.join(appName, "src", "index.css");

    // Tailwind CSS config content
    const tailwindConfig = `module.exports = {
      content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    };`;

    // Default index.css content with Tailwind directives and root styles
    const indexCss = `@tailwind base;
        @tailwind components;
        @tailwind utilities;

        :root {
          --background: #ffffff;
          --foreground: #171717;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --background: #0a0a0a;
            --foreground: #ededed;
          }
        }

        body {
          color: var(--foreground);
          background: var(--background);
          font-family: Arial, Helvetica, sans-serif;
        }
  `;

    // Write the Tailwind config and index.css files
    fs.writeFileSync(tailwindConfigPath, tailwindConfig, "utf-8");
    fs.writeFileSync(indexCssPath, indexCss, "utf-8");
  } catch (error) {
    console.error("\n❌ Error configuring Tailwind CSS:", error.message);
    process.exit(1);
  }
}

module.exports = { installDependencies };
