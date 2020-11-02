const Employee = require("./Employee");
//Manager class
class Manager extends Employee {

    constructor(name, id, email, officeNumber) {

        super(name, id, email);
    
        this.officeNumber = officeNumber;
    };

    getOfficeNumber() {
        return this.officeNumber;
    };

    getRole() {
        return "Manager";
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
module.exports = Manager;