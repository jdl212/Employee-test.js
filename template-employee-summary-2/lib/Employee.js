const { errors } = require("puppeteer");
//Employee class
//Using constructor function to create Employee object with name, id, email
class Employee {
  
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    };

    //returns the name
    getName() {
      return this.name;
    };
  
    //returns the id
    getId() {
      return this.id;
    };
    
    //returns the email
    getEmail() {
      return this.email;
    };
    //returns the role or title
    getRole() {
      return "Employee";
    };
    //validate input
    validate(){
      //validate name
      let re_email = /\S+@\S+\.\S+/;
      let errors=[]
      if(!re_email.test(this.email)){
        errors.push({error:'email',value:this.email});
      }
      return errors;
    }
  };
  
  module.exports = Employee;