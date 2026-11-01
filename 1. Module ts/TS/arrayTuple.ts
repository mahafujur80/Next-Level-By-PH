// array and tuple

let arr : string[] = ["Hello", "Number"];

// arr.push(23)  // error 

const number : Array<string> = ["Bd", 'Cd'];

// tuple 

const numbers : readonly [number, number] = [234,  343];
// numbers.push(234);       // readonly deyer age push hosse 
console.log(numbers)