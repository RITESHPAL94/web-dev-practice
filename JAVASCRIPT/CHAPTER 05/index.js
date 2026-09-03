// Javascript Function 

// console.log("Hey Ritesh you are nice")
// console.log("Hey Ritesh you are good")
// console.log("Hey Ritesh your tshirt is nice")
// console.log("Hey Ritesh you are becoming better")



// function nice(name) {
//     console.log("Hey " + name + " you are nice")
//     console.log("Hey " + name + " your tshirt is nice")
//     console.log("Hey " + name + " you are good")
//     console.log("Hey " + name + " you are becoming better")
// }
// nice("rahul")


function sum(a, b, c = 2) {
    // console.log(a+b)
    return a + b + c
}

result = sum(3, 5)

console.log("The sum of these number is: ", result)

const func1 = (x)=>{
    console.log("I am an arrow function",x)
}
func1(34)
func1(84)
func1(62)