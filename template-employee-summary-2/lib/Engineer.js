const { errors } = require("puppeteer");
const Employee = require("./Employee");
//Engineer Class
class Engineer extends Employee {

    constructor(name, id, email, github) {

        super(name, id, email);
    
        this.github = github;
    };


    getGithub() {
        return this.github;
    };

    getRole() {
        return "Engineer";
    };
    //validate input
    validate(){
        //validate name
        const re_github = /^((http|https|git):\/\/)?(www.|)github.com\/([a-zA-Z0-9]+)/gm;

        let errors=[]
        super.validate().forEach(element => {
            errors.push(element);
        });
        if(!re_github.test(this.github)){
            errors.push({error:'github',value:this.github});
        }
        return errors;
    }
};
module.exports = Engineer;