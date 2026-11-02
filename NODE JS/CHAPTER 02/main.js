const { error } = require("console")
const fs = require("fs")
console.log(fs)

console.log("starting")
// fs.writeFileSync("ritesh.txt", "ritesh is a good guy")

fs.writeFile("ritesh2.txt", " ritesh is a good guy", ()=>{
    console.log("done")
    fs.readFile("ritesh2.txt", (error, data) =>{
        console.log(error, data.toString())
    })


    fs.appendFile("ritesh.txt", "Ritesh is a genius", (e,d)=>{
        console.log(d)
    })
})



console.log("ending")

