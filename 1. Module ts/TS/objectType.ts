// Object type and type alias and interface

// type alias
type User = {
    name: string,
    age: number,
    isMarrid: boolean,
    action: ()=> void,
    badge: string[],
    address: Address,
};

type Address = {
    roadName: string,
    houseNumber: number,
}
// interface 
interface IUser {
    name: string,
    age: number,
    isMarrid: boolean,
    action: ()=> void,
    badge: string[]
}

const user : User  = {
name: "munna",
age: 21,
isMarrid: false,
action: ()=> console.log("Hello Dev"),
badge: ["abc", "def"],
address: {
    houseNumber: 234,
    roadName: "abcdefghijklmnopqrstuvwxyz"
}
};

// user.email = "mahafu"