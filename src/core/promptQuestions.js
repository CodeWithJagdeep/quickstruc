const inquirer = require("inquirer");

// Prompt the user for input using inquirer
async function promptQuestions() {
  let questions = inquirer.createPromptModule();
  try {
    let getAns = await questions([
      {
        type: "input",
        name: "appName",
        message: "What is your project named?",
        default: "my-app",
      },

      {
        type: "confirm",
        name: "useTypeScript",
        message: "Are you using TypeScript in your project?",
        default: true,
      },
    ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    return getAns;
  } catch (error) {
    console.error("Error while asking questions:", error);
    process.exit(1);
  }
}

module.exports = { promptQuestions };
