const inquirer = require('inquirer');
const fs = require('fs');

// const generateREADME = require("./generateREADME.js");

const Employee = require('./Employee');
const Manager = require('./Manager');
const Engineer = require('./Engineer');
const Intern = require('./Intern');

class Init {
    constructor {
        this.teamMembers = [];
    }
    createTeam() {
        this.createManager();
    }
    createManager() {
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
            ])
            .then(({name, id, email, officeNumber}) => {
                const manager = new Manager(name, id, email, officeNumber);
                this.teamMembers.push(manager);
                this.createEmployee();
            })
    }
    createEmployee() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeType',
                    message: 'What type of employee would you like to add?',
                    choices: ['Engineer', 'Intern', "I don't want to add more"],
                  }
            ])
            .then((choice) => {
                if (choice.employeeType === "Engineer") {
                    this.createEngingeer();
                } else if (choice.employeeType === "Intern") {
                    this.createIntern();
                } else {
                    this.createFile();
                }
            })
    }
    createEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'github',
                    message: 'What is your GitHub username?',
                  },
        ])
            .then(({github}) => {
                const engineer = new Engineer(github);
                this.teamMembers.push(engineer);
                this.createEmployee();
        })
    }
    createIntern() {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'school',
                message: 'What school do you attend?',
              },
    ])
        .then(({school}) => {
            const intern = new Intern(school);
            this.teamMembers.push(intern);
            this.createEmployee();
    })
    }
    createFile() {
        fs.writeFile('team.html', teamMembers, (err) =>
        err ? console.error(err) : console.log('Generating team.html...')
    );
    }  
};         

module.exports = Init;