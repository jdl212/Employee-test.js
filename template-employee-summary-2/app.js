const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util")
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const writeFileAsync = util.promisify(fs.writeFile);
// Ask input for manager
const inputManager=[
    {
        type: "input",
        name: "name",
        message: "Enter name of Manager: "
    },
    {
        type: "input",
        name: "id",
        message: "Enter ID of manager: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter email of manager: "
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter office number of manager: "
    }];
// Ask input for engineer

const inputEngineer=[
{
    type: "input",
    name: "name",
    message: "Enter name of engineer : "
},
{
    type: "input",
    name: "id",
    message: "Enter ID of engineer : "
},
{
    type: "input",
    name: "email",
    message: "Enter email of engineer : "
},
{
    type: "input",
    name: "github",
    message: "Enter GitHub Username of engineer : "
}]
// Ask input for intern
const inputIntern=[
    {
        type: "input",
        name: "name",
        message: "Enter name of Intern: "
    },
    {
        type: "input",
        name: "id",
        message: "Enter ID of Intern: "
    },
    {
        type: "input",
        name: "email",
        message: "Enter email of Intern:"
    },
    {
        type: "input",
        name: "school",
        message: "Enter school account of intern: "
    }
]
// Ask input from user using cmd prompt
function promptUser(inputData) {
    return inquirer.prompt(inputData);
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
async function init() {
    console.log("Welcome to My Team cli application: ")
    try {
        let employees=[];
        let takeInput=true;
        //take manager input
        while(takeInput){
            let answers = await promptUser(inputManager);
            console.log("Your input: ",answers);
            let confirm = await promptUser({type:"input",name:"confirm",message:"Is the input correct ? Y[Yes]:N[No] :"});
            if(confirm.confirm=="Y" || confirm.confirm==("Yes")){
                let manager = new Manager(answers.name,answers.id,answers.email,answers.officeNumber);    
                if(manager.validate().length==0){
                    employees.push(manager);
                    takeInput=false;
                }else{
                   console.log("VALIDATION ERROR: ",engineer.validate(),"Please input again:");
               }
            }
        }
        //ask for no of engineers and then take engineer inputs
        let noOfEngineers = await promptUser({type:"input",name:"count",message:"Enter number of Enigineers:"});
        console.log("Your input: ",noOfEngineers);
        for(let i=0;i<noOfEngineers.count;i++){
            answers = await promptUser(inputEngineer);
            console.log("Your input Number: {",i+1,"} : ",answers);
            let confirm = await promptUser({type:"input",name:"confirm",message:"Is the input correct ? Y[Yes]:N[No] :"});
            if(confirm.confirm=="Y" || confirm.confirm==("Yes")){
               let engineer =  new Engineer(answers.name,answers.id,answers.email,answers.github);
               if(engineer.validate().length==0){
                    employees.push(engineer);
               }else{
                   i--;
                   console.log("VALIDATION ERROR: ",engineer.validate(),"Please input again:");
               }
            }else{
                i--;    
            }
        }
        //ask for no of intern and then take intern inputs
        let noOfInterns = await promptUser({type:"input",name:"count",message:"Enter number of Interns:"});
        for(let i=0;i<noOfInterns.count;i++){
            answers = await promptUser(inputIntern);
            console.log("Your input Number: {",i+1,"} : ",answers);
            let confirm = await promptUser({type:"input",name:"confirm",message:"Is the input correct ? Y[Yes]:N[No] :"});
            if(confirm.confirm=="Y" || confirm.confirm=="Yes"){
                let intern=new Intern(answers.name,answers.id,answers.email,answers.school);
                if(intern.validate().length==0){
                    employees.push(intern);
                }else{
                   i--;
                   console.log("VALIDATION ERROR: ",intern.validate()," Please input again:");
                }
            }else{
                i--;    
            }
        }
        //render all the employees to html
        const html = render(employees);
        //writeFile will creat html page with the answers
        await writeFileAsync(outputPath, html);
  
        console.log("Successfully wrote to :"+outputPath);
    } catch (err) {
        console.log(err);
    }
  }
  
  init();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
