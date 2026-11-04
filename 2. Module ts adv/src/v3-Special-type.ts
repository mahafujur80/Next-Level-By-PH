//*Top Type
let x: any = "Hello World"; //?type checkin off kore dey any
x = 2323;
x = true; //? we can assgin  anythink what ever you want
console.log(x.length);

const something: unknown = "Hello World";
// console.log(something.length)  //? throw error because we are no confirm the type is string

//*  Core type

const num: number = 2323;
const name: string = "Munna";

let something2 : unknown = num;

//* Nullish Type

interface User {
    name: string;
}
type loggedInUser = User | null;
const currentUser : loggedInUser =  null;


//* Union type

const greet = ()=>{
    console.log("Hello")

};
something2 = greet();

// const greeting : string = greet()  //! type void is not  assignable to type string because branch change

//* Unite type Sub-type 

const greet2 = (): undefined =>{
    console.log("Sub-type is here")
    return undefined;
};

greet()


//* Bottom type (never)

// const newType : never = "weorwe" //! we can't assign anything in type never;
