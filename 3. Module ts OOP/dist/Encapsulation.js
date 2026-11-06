//* Encapsulation 
//? public
//? private
//? protected
//?get and set
class Employee {
    name;
    baseSalary;
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    ;
    get getSalary() {
        return this.baseSalary;
    }
    ;
    set setSalary(data) {
        this.baseSalary = data;
    }
    ;
}
;
const employee = new Employee("mrm", 20000);
employee.setSalary = 30000;
console.log(employee.getSalary);
export {};
