// per the npm page, v9+ requires es6 syntax - we can still import like this
const inquirer = require('inquirer');

// this package is provided by node itself, meaning we dont need to install it with a package manager like npm
const path = require('path');

// we need this in order to interact with the file system
const fs = require('fs');
const { error } = require('console');


// things we need to ask the user about
// Title
// Description
// Installation 
// Usage 
// License
// Contributing
// Tests 
// Questions
// GitHub username

// things we can make automatically
// Table of Contents

// we also need some default template strings that we can work with

// we also need to be able to create a file, and write to it


const questions = [
  // project name
  {
    type: 'input',
    name: 'title',
    message: 'Title of the project?',
    default() {
        return 'Generic-Project-Name';
    }
  },

  // project description
  {
    type: 'input',
    name: 'description',
    message: 'Description of the project?',
    default() {
        return 'Enter your description here';
    }
  },
 // installation requirements
  {
    type: 'input',
    name: 'installation',
    message: 'Installation requirements and commands for the program?',
    default() {
        return 'There are no installation requirements';
    }
  },
 // program usage
  {
    type: 'input',
    name: 'usage',
    message: 'How do you use the program?',
    default() {
        return 'There is no information about usage';
    }
  },
  //License
  {
    type: 'list',
    name: 'license',
    message: 'What is your preferred license?',
    choices: ['BSD v3', 'GPL v3', 'MIT', 'WTFPL', 'UNLICENSED'],
    default() {
        return 'UNLICENSED';
    },
    filter(value){
      // handle license badges
      switch (value) {
        case 'BSD v3':
          return {
            snippet: '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
            name: value
          }
          break;

        case 'GPL v3':
          return {
            snippet: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
            name: value
          }
          break;

        case 'MIT':
          return {
            snippet: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
            name: value
          }
          break;

        case 'WTFPL':
          return {
            snippet: '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)',
            name: value
          }
          break;
          
        case 'UNLICENSED':
          return {snippet: 'UNLICENSED', name: value}
          break;

        // default cases dont test against anything and will be executed if none of the other cases test true
        // we should probably throw an error here
        default:
          throw new Error('Invalid License Option Error')
          // break;
      }
    }
  },
  // Contributing
  {
    type: 'input',
    name: 'contributing',
    message: 'How can others contribute to the program?',
    default() {
        return 'There is no information about contribution';
    }
  },
  // Tests 
  {
    type: 'input',
    name: 'tests',
    message: 'How do users run tests on the program?',
    default() {
        return 'There is no information about testing';
    }
  },
  // Questions
  {
    type: 'input',
    name: 'email',
    message: 'How should others contact you via email with questions?',
    default() {
        return 'There is no email provided';
    }
  },
  // GitHub username
  {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your github username?',
    default() {
        return 'There is no github username provided';
    }
  },
]


// [![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

// [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

// [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

// [![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)

// Title
// Description
// Installation 
// Usage 
// License
// Contributing
// Tests 
// Questions
// GitHub username
function createTemplate(answers) {
  return `${answers.license.snippet}

# ${answers.title}

## [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Description

${answers.description}

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is licensed under the ${answers.license.name} license.
Please refer to the license badge at the top of this document.

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

Please reach out to me with additional questions at this email address: ${answers.email}

[GitHub User: ${answers.githubUsername}](https://github.com/${answers.githubUsername}/)
`

}

inquirer
  .prompt(questions)
  .then((answers) => {
    // here, we have to use the answers to populate our template
      var template = createTemplate(answers);
    // and then we need to write the template to a file
    fs.writeFileSync(`generated-README.md`, template, {encoding: 'utf-8'})
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error('tty error');
    } else {
      // Something else went wrong
      console.error(error);
    }
  });

  
