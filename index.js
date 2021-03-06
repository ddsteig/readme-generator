// Variables required for usage.

const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./util/generateMarkdown");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// This function uses inquirer to display user prompts when run through node.

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the title of your readme?",
      name: "title",
    },
    {
      type: "input",
      message: "Enter a description of your readme.",
      name: "description",
    },
    {
      type: "input",
      message: "Enter installation instructions.",
      name: "install",
    },
    {
      type: "input",
      message: "Enter useage information.",
      name: "usage",
    },
    {
      type: "list",
      message: "Select a license.",
      name: "license",
      choices: ["None", "MIT", "Apache 2.0", "GPLv3"],
    },
    {
      type: "input",
      message: "Enter contributer, or resource information.",
      name: "contributer",
    },
    {
      type: "input",
      message: "List any test information.",
      name: "test",
    },
    {
      type: "input",
      message: "Enter your email.",
      name: "email",
    },
    {
      type: "input",
      message: "Enter your GitHub user name.",
      name: "github",
    },
    ]);
}

// This calls the prompt data and creates a promise to write the readme.
// Also displays errors.

promptUser()
  .then(function (data) {
    const readme = generateMarkdown(data);

    return writeFileAsync("README.md", readme);
  })
  .then(function () {
    console.log("Readme Generated!");
  })
  .catch(function (err) {
    console.log(err);
  });
