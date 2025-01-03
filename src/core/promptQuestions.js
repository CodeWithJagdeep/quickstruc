const inquirer = require("inquirer");
const clc = require("cli-color");

// Default questions array

const questions = [
  {
    type: "list",
    name: "framework",
    message: "Which library or framework would you like to use?",
    choices: ["React", "Node"],
    default: "React",
  },
  {
    type: "input",
    name: "appName",
    message: "What is your project named?",
    default: "my-app",
    validate: (input) => {
      let regex = /^[a-z0-9]+$/;
      if (regex.test(input)) {
        return true;
      }
      return "Project name can only contain lowercase letters and numbers, with no spaces or special characters.";
    },
  },
  {
    type: "confirm",
    name: "useTypeScript",
    message: "Are you using TypeScript in your project?",
    default: true,
  },
  {
    type: "list",
    name: "database",
    message: "Which database would you like to use?",
    when: (answers) => answers.framework === "Node",
    choices: ["MongoDB", "PostgreSQL", "MySQL"],
    default: "MongoDB",
  },
  {
    type: "confirm",
    name: "testing",
    message:
      "Would you like to add testing frameworks to your project? (Jest, Mocha, Chai, etc.)",
    default: true,
  },
  {
    type: "list",
    name: "testingTools",
    message: "Which testing tools would you like to include?",
    when: (answers) => answers.testing,
    choices: ["Jest", "Mocha", "Chai", "Supertest", "Cypress"],
    default: ["Jest"],
  },

  {
    type: "confirm",
    name: "useDocker",
    message: "Would you like to add Docker support to your project?",
    when: (answers) => answers.framework === "Node",
    default: false,
  },
];

/**
 * Prompts the user with a set of questions.
 *
 * @param {Array} questions - An array of inquirer questions to ask the user. If not provided, it defaults to a set of predefined questions.
 * @returns {Promise<Object>} - A promise that resolves to an object with the user's responses.
 */

async function promptUser(question = questions) {
  let prompt = inquirer.createPromptModule();
  try {
    const responses = await prompt(question);
    return responses;
  } catch (error) {
    process.exit(1);
  }
}

module.exports = { promptUser };
