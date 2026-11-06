//?type narrow down continued

//*some caved of type guard

const printAll = (x: string | string[] | null) => {
  if (x && typeof x === "object") {
    for (let str of x) {
      console.log(str);
    }
  } else if (typeof x === "string") {
    console.log(x);
  }else{
    console.log("empty for null")
  }
};

printAll("munna");

//* Equality

const compare = (x: string | number, y: number | boolean)=>{
 if(x === y){
    console.log(x, y)
 }
}

// print all
const printAllAgain = (x:string | string[] | null)=>{
    if(x !== null){
        if(typeof x !== "string"){
            for(let str of x){
                console.log(str);
            };
            return
        }else{
            console.log(x)
            return
        }
    }else{
        console.log("Empty")
    }
}

printAllAgain(null)

//* in Operator

interface Bird {
    fly: ()=> void;
};
interface Fish {
    swim: ()=> void;
};

const checkAnimal = (animal: Bird | Fish)=>{
   if("fly" in animal){
     animal.fly()
   }else if("swim" in animal){
    animal.swim()
   }
}