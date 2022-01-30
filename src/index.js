const inquirer = require("inquirer");
const fs = require("fs");

const Employee = require("../lib/Employee");
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

const teamMembers = [];

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the engineer's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the engineer's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the engineer's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the engineer's github?",
        name: "github",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      teamMembers.push(engineer);
      selectMember();
    });
}
function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the intern's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the intern's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What school do they attend?",
        name: "school",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      teamMembers.push(intern);
      selectMember();
    });
}
function generateHtml() {
  let htmlTag = ``;
  for (let i = 0; i < teamMembers.length; i++) {
    htmlTag += writeHtml(teamMembers[i]);
  }
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile Page</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-4">
            <span class="navbar-brand mb-0 h1 w-100 text-center text-light bg-info">Team Profile Page</span>
        </nav>
        <div class="container">
            ${htmlTag}
        </div>
    </body>
  </html>`;
  fs.writeFile("../dist/team.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("Successfully creating team profile...");
}
function writeHtml(employee) {
  const name = employee.getName();
  const role = employee.getRole();
  const id = employee.getId();
  const email = employee.getEmail();
  let data = "";
  if (role === "Engineer") {
    const github = employee.getGithub();
    data = `
  <div class="d-flex flex-wrap col-4 mt-4 w-100">
        <div class="card h-100 text-light bg-primary mb-3">
            <div class="card-header text-center">
                <h3>${name}</h3>
                <h4>Engineer</h4>
            </div>
            <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: <a href="mailto:${email}"> ${email}</a></p>
                <p>Github: <a href="https://github.com/${github}" target="_blank">${github}</a></p>
            </div>
        </div>
    </div>`;
  } else if (role === "Intern") {
    const school = employee.getSchool();
    data = `
<div class="d-flex flex-wrap col-4 mt-4 w-100">
    <div class="card h-100 text-light bg-success mb-3">
        <div class="card-header text-center">
            <h3>${name}</h3>
            <h4>Intern</h4>
        </div>
        <div class="card-body">
            <p>ID: ${id}</p>
            <p>Email:<a href="mailto:${email}"> ${email}</a></p>
            <p>School: ${school}</p>
        </div>
    </div>
</div>`;
  } else {
    const officeNumber = employee.getOfficeNumber();
    data = `
<div class="d-flex flex-wrap col-4 mt-4 w-100">
    <div class="card h-100 text-light bg-danger mb-3">
        <div class="card-header text-center">
            <h3>${name}</h3>
            <h4>Manager</h4>
        </div>
        <div class="card-body">
            <p>ID: ${id}</p>
            <p>Email: <a href="mailto:${email}"> ${email}</a></p>
            <p>Office Number: ${officeNumber}</p>
        </div>
    </div>
</div>`;
  }
  return data;
}
function selectMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "Would you like to add another?",
        choices: ["Add Engineer", "Add Intern", "Done"],
      },
    ])
    .then((answers) => {
      if (answers.selection === "Add Engineer") {
        createEngineer();
      } else if (answers.selection === "Add Intern") {
        createIntern();
      } else {
        generateHtml();
      }
    });
}
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the manager's name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is the manager's id?",
      name: "id",
    },
    {
      type: "input",
      message: "What is the manager's email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is the manager's office number?",
      name: "officeNumber",
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    teamMembers.push(manager);
    selectMember();
  });