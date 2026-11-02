import  fs  from "fs/promises";
let a = await fs.readFile("ritesh.txt")

let b = await fs.appendFile("ritesh.txt", "\n\n\nthis is amazing promise")
console.log(a.toString(),b)