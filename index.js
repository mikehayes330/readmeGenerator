const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of this project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please give a detailed description of your project."
    },
    {
      type: "input",
      name: "install",
      message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running."
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide instructions and examples for use."
    },
    {
      type: "checkbox",
      message: "Please provide instructions and examples for use.",
      choices: [
        "isc",  
        "mit"
      ],
      name: "license"
     
    },
    {
      type: "input",
      message: "How can people help with this project.",
      name: "contribution"
    },
    {
      type: "input",
      message: "Are there any test instructions?",
      name: "test"
    },
    {
      type: "input",
      message: "What version is the project (X.x) ",
      name: "version"

    },
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "github"
    },
    {
      type: "input",
      message: "What is your email address?",
      name: "email"
    }
    
  ]);
}

function generateMD(answers) {
  
  const mark = "```"
  
  
  return `
  # ${answers.title}

  ## Description 
  ![version shield](https://img.shields.io/badge/Version-${answers.version}-blue.svg)
  ![license shield](https://img.shields.io/badge/License-${answers.license}-green.svg)
 
    ${answers.description}
 
  ## Table of Contents
  
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Testing](#testing)
  * [Contributing](#contributing)
  * [Questions](#questions)
  
  
  ## Installation
  
    ${answers.install}
  
  ## Usage
  
    ${answers.usage}
  
  ## License
  
  The license for this project is the ${answers.license} - For more information on the ${answers.license} license 
  
  [Click Here](https://choosealicense.com/licenses/${answers.license}/)
  
  ## Testing
  
    ${answers.test}
  
  ## Contributing
  
    ${answers.contribution}
  
  ## Questions
  
  Please contact for any reason at:

  ###[Github - ${answers.github}](https://github.com/${answers.github})

  or

  ###Email: ${answers.email}
 


  `;
}

promptUser()
  .then(function(answers) {
    const markDown = generateMD(answers);

    return writeFileAsync("readme.md", markDown);
  })
  .then(function() {
    console.log("Successfully wrote your readme file");
  })
  .catch(function(err) {
    console.log(err);
  });
