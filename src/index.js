#!/usr/bin/env node

const { promptUser } = require("./core/promptQuestions.js");
const { handleReactSetup } = require("./core/reactSetup.js");
const clc = require("cli-color");
const inquirer = require("inquirer");
const fs = require("fs");

const path = require("path");
const { nodeStructure } = require("./template/nodeStructure.js");
const { createFolderStructure } = require("./core/createFolderStructure.js");
const { reactStructure } = require("./template/ReactStructure.js");
const { handleNodeSetup } = require("./core/nodeSetup.js");

async function initProject() {
  try {
    const args = process.argv.slice(2);
    const template = args[1] || "default"; // Fallback to 'default' template if unspecified

    // Validate the command
    if (args[0] !== "init") {
      console.log(clc.red("Usage: quickstruc init"));
      process.exit(1);
    }

    console.log("\n");
    // Prompt user for configuration
    const answers = await promptUser();
    const { framework, appName } = answers;

    // Check if the folder already exists
    const folderExist = path.join(process.cwd(), appName || "testing");
    if (fs.existsSync(folderExist)) {
      console.error(clc.red("\n❌ Folder already exists!"));
      process.exit(1);
    }
    // Handle framework-specific setup
    if (framework === "React") {
      await handleReactSetup(answers);
    } else {
      await handleNodeSetup(answers);
    }
  } catch (err) {
    console.error(
      clc.red("\n❌ An error occurred during project initialization.")
    );
    console.error(clc.red(err));
    process.exit(1);
  }
}

initProject();
