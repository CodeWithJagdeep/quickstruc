#!/usr/bin/env node

const { promptQuestions } = require("./core/promptQuestions.js");
const { createFolderStructure } = require("./core/createFolderStructure.js");
const clc = require("cli-color");
const fs = require("fs");
const path = require("path");
const { root } = require("./template/ReactStructure.js");
const { exec } = require("child_process");
const { spinner } = require("../util/spinner.js");
const { installDependencies } = require("./config/dependency.js");
const { showFolderStructure } = require("./core/conclusion.js");

// Main function to handle the project setup
async function initProject() {
  const args = process.argv.slice(2);
  const template = args[1] || "default"; // Fallback to 'default' if no template is specified
  // Validate the command
  if (args[0] !== "init") {
    console.log("Usage: filesmith init [options]");
    process.exit(1);
  }
  console.log(`Initializing project with ${template} template...`);
  const answers = await promptQuestions();
  const appName = answers.appName; // Get the app name from the answers
  const useTypeScript = answers.useTypeScript;
  const createReactCommand = useTypeScript
    ? `npx create-react-app ${appName} --template typescript`
    : `npx create-react-app ${appName}`;
  console.log(`Initializing fresh ReactJS project: ${appName}...`);
  const projectSetUp = spinner("Setting up project...");
  const folderExist = path.join(process.cwd(), appName);
  if (!fs.existsSync(folderExist)) {
    exec(createReactCommand, async (error) => {
      if (error) {
        console.error("\n❌ Project setup failed:", error.message);
        process.exit(1);
      }
      // Initialize the project folder structure
      const projectDir = path.join(process.cwd(), appName, "src");
      const boilerplatePath = path.join(
        __dirname,
        "..",
        "boilerplate",
        "react",
        "src"
      );
      if (!fs.existsSync(boilerplatePath)) {
        console.error("\n❌ Boilerplate path does not exist:", boilerplatePath);
        process.exit(1);
      }

      await createFolderStructure(
        projectDir,
        root.src,
        boilerplatePath,
        useTypeScript
      );
      // Install dependencies
      await installDependencies(appName, useTypeScript);
      await showFolderStructure(appName);
      clearInterval(projectSetUp);
    });
  } else {
    console.error("\n❌ folder already exist!");
  }
}

initProject();
