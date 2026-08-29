// Javascript Conditionals
console.log("Hello I am Conditional tutorial")

let age = 1

// let grace = 2

// console.log(age + grace)
// console.log(age - grace)
// console.log(age * grace)
// console.log(age / grace)
// console.log(age ** grace)
// console.log(age % grace)

// if ((grace+age)>18){
//     console.log("You can drive")
// }

// else{
//     console.log("You cannot drive")
// 

if (age == 18) {
    console.log("You can drive")
}

else if (age == 0) {
    console.log("Are you kidding?")
}

else if (age == 1) {
    console.log("Are you again kidding?")
}
else {
    console.log("You cannot drive")
}

let a = 6

let b = 8

let c = a > b ? (a - b) : (b - a)

/*
Translate to:
if(a>b){
let c = a-b
}
else{
    let c = b - a
} 
*/