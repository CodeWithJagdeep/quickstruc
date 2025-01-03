const spinner = (message) => {
  const spinnerChars = ["|", "/", "-", "\\"];
  let i = 0;

  const spinnerInterval = setInterval(() => {
    process.stdout.write(`\r${message} ${spinnerChars[i++]}`);
    i %= spinnerChars.length;
  }, 100);

  return spinnerInterval;
};

module.exports = { spinner };
