// code from previous homework
const inquirer = require('inquirer');
const fs = require('fs');

// const generateREADME = require("./generateREADME.js");

const init = () => {
    let teamMembers = [];
    console.log("Build your Team!");
    inquirer
            .prompt([
                {
                  type: 'input',
                  name: 'name',
                  message: "What is your manager's name?",
                },
                {
                  type: 'input',
                  name: 'id',
                  message: 'What is your id?',
                },
                {
                  type: 'input',
                  name: 'email',
                  message: 'What is your email?',
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is your office number?',
                  },
                {
                    type: 'list',
                    name: 'employee',
                    message: 'What type of employee would you like to add?',
                    choices: ['Engineer', 'Intern', "I don't want to add more"],
                  },
                
                // {
                //     type: 'input',
                //     name: 'github',
                //     message: 'What is your GitHub username?',
                //   },
                // {
                //   type: 'input',
                //   name: 'school',
                //   message: 'What school do you attend?',
                // },
                // // manager

              ])
            .then((responses) => {
                teamMembers.push(responses);
                console.log(responses);
            }

            inquirer
                .prompt()
                .then((responses) => {
                    if (responses.employee === "Engineer") {
                        createEngingeer()
                    } else if (responses.employee === "Intern") {
                        createIntern()
                    } else {
                
                    }}
                // const readmeContent = generateREADME(responses, badgeChoice);

                // fs.writeFile('team.html', readmeContent, (err) =>
                //     err ? console.log(err) : console.log('Successfully created README.md!')
                // );
            );
            );
        };
init();