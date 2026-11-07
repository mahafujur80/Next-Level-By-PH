// Polymorphism
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
        if (data < 0) {
            throw new Error("Provide currect value");
        }
        this.baseSalary = data;
    }
    ;
    calculatePay(taxRate) {
        return this.baseSalary - this.baseSalary * taxRate;
    }
}
;
class Manager extends Employee {
    calculatePay() {
        return this.baseSalary + 5000;
    }
}
;
class Developer extends Employee {
    type;
    constructor(name, baseSalary, type) {
        super(name, baseSalary);
        this.type = type;
    }
}
const newEmployee = new Employee("ayan", 2000);
const manage = new Manager("manger", 50000);
const developer = new Developer("munna", 50000, "backend");
console.log(newEmployee.calculatePay(0.1));
console.log(manage.calculatePay());
console.log(developer.calculatePay(0.5));
export {};
