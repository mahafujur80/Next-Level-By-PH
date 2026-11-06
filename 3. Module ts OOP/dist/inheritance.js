//? ইনহেরিটেন্স হলো এমন একটি প্রক্রিয়া, যার মাধ্যমে একটি নতুন ক্লাস (Child Class বা Subclass) ইতিমধ্যে তৈরি থাকা অন্য কোনো ক্লাসের (Parent Class বা Superclass) প্রপার্টি (বৈশিষ্ট্য) এবং মেথডগুলো (কার্যকারিতা) উত্তরাধিকার সূত্রে বা ফ্রিতে পেয়ে যায়। এর ফলে নতুন করে আর একই কোড বারবার লিখতে হয় না
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
    describe() {
        return `${this.name} earn per month ${this.baseSalary}`;
    }
}
;
//* new class manager
class Manager extends Employee {
    teamCount;
    // teamCount: number;
    // constructor (name:string, baseSalary:number, teamCount : number){
    //     super(name, baseSalary)
    //     this.teamCount = teamCount;
    // }
    constructor(name, baseSalary, teamCount) {
        super(name, baseSalary);
        this.teamCount = teamCount;
    }
    describeWork() {
        return `Our Manager ${this.name} manage total ${this.teamCount} employee and her her salary ${this.baseSalary}`;
    }
}
;
const employee = new Employee("mrm", 20000);
employee.setSalary = 30000;
console.log(employee.getSalary);
console.log(employee.describe());
//manager
const manager = new Manager("Miraj", 40000, 20);
console.log(manager.getSalary);
console.log(manager.describe());
console.log(manager.describeWork());
export {};
