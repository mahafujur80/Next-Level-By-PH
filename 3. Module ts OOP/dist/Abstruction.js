//* 
class Animal {
}
;
class Dog extends Animal {
    makeSound() {
        console.log("Woof!");
    }
}
class Cat extends Animal {
    makeSound() {
        console.log("Meow!");
    }
}
const dog = new Dog();
const cat = new Cat();
console.log(dog.makeSound());
console.log(cat.makeSound());
export {};
