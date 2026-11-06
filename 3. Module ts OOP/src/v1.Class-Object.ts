// Class , this , new , constructor 

class Employee {
    name: string;
    basicSalary: number;

    constructor(name:string, salary:number){
        this.name = name;
        this.basicSalary = salary;
    }
};

const newEmployee = new Employee("munna", 20000);
const secondEmployee = new Employee("maruf", 25000)

console.log(newEmployee)
console.log(secondEmployee);
