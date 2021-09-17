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
  ])
  .then((answer) => {
    shell.exec(
      `git clone https://github.com/SketchLagoon/rocket-science.git ${answer.app_name}`
    );
  });
