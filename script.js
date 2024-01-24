// per the npm page, v9+ requires es6 syntax - we can still import like this
const inquirer = require('inquirer');
const path = require('path');



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
  {
    type: 'input',
    name: 'title',
    message: 'Title of the project?',
    default() {
      // this gets the dirname for script.js, _this_ file
      // we might want to pick a better name though
      return path.basename(path.dirname(__filename));
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description of the project?',
    default() {
        return 'Enter your description here';
    }
  },
]

inquirer
  .prompt(questions)
  .then((answers) => {
    // Use user feedback for... whatever!!
    
    console.log(answers);
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

