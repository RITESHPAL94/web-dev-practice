const express = require('express')
const app = express()
const port = 3000
const blog = require('./routes/blogs')
const fs = require("fs")

// app.use(express.static("public"))

app.use('/blog', blog)

// Middleware 1 - Logger for our application
app.use((req, res, next) => {
    console.log(req.headers)
    req.ritesh = "I am ritesh bhai";
    fs.appendFileSync("logs.txt", `${Date.now()} is a ${req.method}\n`)
    console.log(`${Date.now()} is a ${req.method}`)
    // res.send("Hacked by Middlware 1")
    next()
})

// Middleware 2
app.use((req, res, next) =>{
    console.log('m2')
    next()                      
})

app.get('/', (req, res) =>{
    res.send('Hello world!')
})

app.get('/about', (req, res) =>{
    res.send('Hello about!')
})

app.get('/contact', (req, res) =>{
    res.send('Hello contact!' + req.ritesh)
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})