//* typeof

const x = "Hello";

console.log(typeof x);

//* type guard

const print = (value: number | string)=>{
    //?type narrow down
    if(typeof value === "string"){
        return value.toUpperCase()
    }else {
        return value.toFixed(2)
    }
};
console.log(print("munna"));

//*Truthiness
type User = {
    name: string,
    address?:{
        street: string,
    }
} | null;

const loggedInUser : User = {
    name: "ayan",
    address:{
        street:"adfsda"
    }
};

const showAddress = (user: User)=>{

    if(user && user.address){
        console.log(user.address.street)
        return;
    }
    throw new Error("user not found")
};

showAddress(loggedInUser)
