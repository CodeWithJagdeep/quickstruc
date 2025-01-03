const { exec } = require("child_process");

const executions = async (command) => {
  return new Promise((resolve, reject) => {
    exec(command, async (error) => {
      if (error) {
        console.error("\n❌ Project setup failed:", error.message);
        process.exit(1);
      }
      resolve(true); // resolve with the command's standard output
    });
  });
};

module.exports = { executions };
