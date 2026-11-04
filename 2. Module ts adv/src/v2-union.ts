// litarel type

type Status = "pending";

const status: Status = "pending";
console.log(status);

// Litarel type
type Role = "admin" | "manager" | "buyer";

const user : Role = "buyer";
console.log(user);

// object union
type admin = {id:number, role: "admin", controlUser: string[] };
type manager = {id:number, role: "manager", plants: string[]};

type User = admin | manager;

const users : User = {id:23, role: "manager", plants: ["abc", "def"] };

console.log(users)