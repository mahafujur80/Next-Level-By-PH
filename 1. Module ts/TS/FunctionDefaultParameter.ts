// function default parameter


let fullName = (firstName: string, lastName?: string)=>{
 if(!lastName){
    return firstName;
 };
 return firstName + " " + lastName;
};

console.log(fullName("mahafujur",));


let fullName2 = (firstName: string, lastName: string) : void =>{
console.log(firstName, lastName)
};

console.log(fullName2("hello","mahafujur",));



console.log("-------------------------------------------------")

// function default parameters

const greeting = (firstName:string,  greeting= "Hello")=>{
    console.log(greeting + " " + firstName)
};

greeting("munna")

