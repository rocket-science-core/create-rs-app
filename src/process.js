const shell = require("shelljs");
const { changePorts } = require("./ports");
const { successMessage } = require("./success");

/**
 * Execute code following inquirer prompt
 * @param {object} answer - The answer from the inquirer prompt
 */
async function process(answer) {
  let branch = "";

  switch (answer.app_language) {
    case "strict-typescript":
      branch = "strict-typescript";
      break;
    case "javascript (ES6+)":
      branch = "javascript";
      break;
    default:
      branch = "main";
  }

  shell.exec(
    `git clone --single-branch -b ${branch} https://github.com/rocket-science-core/rocket-science.git ${answer.app_name}`
  );
  shell.cd(answer.app_name);

  changePorts(answer.federated_port, answer.storybook_port)
    .then(() => {
      if (branch !== "main") {
        shell.exec(`git checkout -b main`);
        shell.exec(`git branch -d ${branch}`);
      }
    })
    .then(() => {
      successMessage(answer);
    });
}

module.exports = { process };
