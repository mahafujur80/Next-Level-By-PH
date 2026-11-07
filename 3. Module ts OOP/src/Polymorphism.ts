// Polymorphism

class Employee {
    constructor(
        public name:string,
        protected  baseSalary:number
     ){
     };

     get getSalary(): number {
       return  this.baseSalary
     };

     set setSalary(data:number){
        if(data < 0){
            throw new Error("Provide currect value")
        }
        this.baseSalary = data
     };

    calculatePay(taxRate:number):number {
        return this.baseSalary - this.baseSalary * taxRate;
    }
};


class Manager extends Employee {
    override calculatePay(){
        return this.baseSalary + 5000;
    }
};

class Developer extends Employee {
    constructor(
         name: string ,
         baseSalary: number, 
        public type: string
    ){
        super(name, baseSalary)
    }
}

const newEmployee = new Employee("ayan", 2000);
const manage = new Manager("manger", 50000);
const developer = new Developer("munna", 50000, "backend")

console.log(newEmployee.calculatePay(0.1))
console.log(manage.calculatePay());
console.log(developer.calculatePay(0.5))
