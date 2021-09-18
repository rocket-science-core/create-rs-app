#!/usr/bin/env node
const inquirer = require("inquirer");
const shell = require("shelljs");

inquirer
  .prompt([
    {
      type: "input",
      message: "Pick the name of your rocket-science app:",
      name: "app_name",
      default: "my-rs-app",
    },
    {
      type: "list",
      message: "Pick a language:",
      name: "app_language",
      choices: ["typescript", "strict-typescript", "javascript (ES6+)"],
      default: "typescript",
    },
  ])
  .then((answer) => {
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
      `git clone --single-branch -b ${branch} https://github.com/SketchLagoon/rocket-science.git ${answer.app_name}`
    );
    shell.cd(answer.app_name);
    if (branch !== "main") {
      shell.exec(`git checkout -b main`);
      shell.exec(`git branch -d ${branch}`);
    }
    shell.echo(``);
    shell.echo(`Successfully Created A New Rocket Science App 🚀🧪`);
    shell.echo(``);
    shell.echo(
      `---------- Get started by running the following commands 👇 ----------`
    );
    shell.echo(``);
    shell.echo(`1. cd ${answer.app_name}`);
    shell.echo(`2. yarn`);
    shell.echo(`3. yarn test`);
    shell.echo(
      `4. yarn start (start the application server) or yarn storybook (start the storybook server)`
    );
    shell.echo(``);
    shell.echo(
      `-------- Optional commands to push to your own git repository --------`
    );
    shell.echo(``);
    shell.echo(
      `5. git remote set-url origin https://github.com/user/repo.git (your remote repository)`
    );
    shell.echo(`6. git remote -v (verify new remote)`);
    shell.echo(`7. git push -u origin main`);
    shell.echo(``);
  });
