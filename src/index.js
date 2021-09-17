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
      choices: ["typescript", "strict-typescript"],
      default: "typescript",
    },
  ])
  .then((answer) => {
    let branch = "";

    switch (answer.app_language) {
      case "strict-typescript":
        branch = "strict-typescript";
        break;
      default:
        branch = "main";
    }

    shell.exec(
      `git clone -b ${branch} https://github.com/SketchLagoon/rocket-science.git ${answer.app_name}`
    );
    shell.echo(`Successfully Created A New Rocket Science App 🚀🧪`);
    shell.echo(`Get started by running the following commands 👇`);
    shell.echo(`1. yarn`);
    shell.echo(`2. yarn test`);
    shell.echo(
      `3. yarn start (start the application server) or yarn storybook (start the storybook server)`
    );
  });
