/* write a program to calculate factoraila ofa a number using reduce and using for loops
// */

let arr = [1, 2, 3]

const product = (a,b)=>{

    return a*b
}
console.log(arr.reduce(product))



// let final = 6
// for (let index = 0; index < arr.length; index++) {
//     const element = arr[index];
//     final = final * element
// }
//     console.log(final)




let num = 6
let final = 1
 for (let index = num; index >= 1; index--) {
    final = final * index
 }
 console.log(final)