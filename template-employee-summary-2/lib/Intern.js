//extends the employee class
const Employee = require("./Employee");
//Intern Class
class Intern extends Employee {
    constructor(name, id, email, school){
        //super gets the employee properties
        super(name, id, email);
        //this. adds the employee properties
        this.school = school;   
    };

    //returns the school of the employee
    getSchool() {
        return this.school;
    };

    //returns the role of the employee
    getRole() {
        return "Intern";
    };
    //validate input
    validate(){
        let errors=[]
        super.validate().forEach(element => {
            errors.push(element);
        });
        return errors;
    }
    
};
//.exports allows this page to be used elsewhere
module.exports = Intern;