// async => it can be used before a function name !!
// await => it can only be used inside a async function !!

// IIFE => Immediately Invoked Function Expressions !!
const fs = require("fs") ;

console.log("start") ;

async function callme(){
try{
    console.log("Hello World") ;
    console.log("I am inside async function !!") ;

    let f1kaPP = fs.promises.readFile("./f1.txt", "utf8") ;
    let f2kaPP = fs.promises.readFile("./f2.txt", "utf8") ;

    let bothFilesData = await Promise.all([f1kaPP, f2kaPP]) ;
    console.log(bothFilesData) ;

}catch(error){
    console.log(error) ;
    }
}
callme() ;

console.log("end") ;