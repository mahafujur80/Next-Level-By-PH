//* 

abstract class Animal {
    abstract makeSound(): void;
};


class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow!");
    }
}

const dog = new Dog();
const cat = new Cat();

console.log(dog.makeSound());
console.log(cat.makeSound());
