#!/usr/bin/env node
const inquirer = require("inquirer");
const { process } = require("./process");

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
    {
      type: "input",
      message: "Pick a port to serve your federated modules:",
      name: "federated_port",
      default: "3001",
    },
    {
      type: "input",
      message: "Pick a port to serve your storybook:",
      name: "storybook_port",
      default: "6006",
    },
  ])
  .then((answer) => {
    process(answer);
  });
