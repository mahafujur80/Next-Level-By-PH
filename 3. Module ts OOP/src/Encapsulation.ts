//* Encapsulation 
//? public
//? private
//? protected

//?get and set

class Employee {
    constructor(
        public name:string,
        private  baseSalary:number
     ){
     };

     get getSalary(): number {
       return  this.baseSalary
     };

     set setSalary(data:number){
        this.baseSalary = data
     };
};

const employee = new Employee("mrm", 20000)

employee.setSalary = 30000

console.log(employee.getSalary)

