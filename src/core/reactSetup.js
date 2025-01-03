const clc = require("cli-color");
const path = require("path");
const { promptUser } = require("./promptQuestions");
const { spinner } = require("../../util/spinner");
const { installDependencies } = require("../config/dependency");
const { executions } = require("../../util/Execuations");
const { createFolderStructure } = require("./createFolderStructure");
const { reactStructure } = require("../template/ReactStructure");
const { showFolderStructure } = require("../../util/conclusion");

/**
 * Sets up a React project with optional TypeScript and predefined configurations.
 *
 * @param {string} answers - User responses from the prompt (e.g., framework, language preferences).
 *
 * @returns {Promise<void>} - A Promise that resolves when the setup is complete.
 */

async function handleReactSetup(answers) {
  let projectSetUp;

  // Command to create a new React app (with or without TypeScript template)
  const command = answers.useTypeScript
    ? `npx create-react-app ${answers.appName} --template typescript`
    : `npx create-react-app ${answers.appName}`;

  // List of dependencies to install
  const dependencies = [
    "tailwindcss",
    "postcss",
    "autoprefixer",
    "redux",
    "react-redux",
    "react-router-dom",
    "web-vitals",
    "axios",
    "react-icons",
  ];

  // List of development dependencies
  const devDependencies = [
    "postcss",
    "tailwindcss",
    "eslint",
    "eslint-config-next",
  ];

  // TypeScript-specific dependencies
  const typeDependencies = [
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "@types/axios",
  ];

  try {
    console.log("\n");
    console.log(clc.green("Installing dependencies:"));
    dependencies.forEach((dep) => console.log(clc.cyan(`- ${dep}`)));

    console.log(clc.green("\nInstalling devDependencies:"));
    devDependencies.forEach((devDep) => console.log(clc.cyan(`- ${devDep}`)));

    // Include TypeScript dependencies if applicable
    if (answers.useTypeScript) dependencies.push(...typeDependencies);

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
    projectSetUp = spinner("Setting up React project...");

    // If the user confirms, proceed with project setup
    if (permissions.proceed) {
      await executions(command);

      // Define paths for the new project and boilerplate files
      const projectDir = path.join(process.cwd(), answers.appName, "src");
      const root = path.join(process.cwd(), answers.appName, "src");
      const boilerplatePath = path.join(
        __dirname,
        "../..",
        "boilerplate",
        "react",
        "src"
      );

      // Create the folder structure in the new project
      await createFolderStructure(
        projectDir,
        reactStructure.src,
        boilerplatePath,
        answers,
        root
      );

      // Install the required dependencies and dev dependencies
      await installDependencies(answers.appName, dependencies, devDependencies);
      console.log("here");
      // Show the folder structure for the user
      await showFolderStructure(answers);

      // Stop the spinner when the setup is complete
      clearInterval(projectSetUp);
    }
  } catch (error) {
    // Handle any errors that occur during setup
    console.error(clc.red(error));
    process.exit(1);
  }
}

module.exports = { handleReactSetup };
