const express = require('express')
const blog = require('./routes/blog')
const app = express()
const port = 3000

app.use(express.static("public"))
app.use('/blog',blog)

app.get('/', (req, res) => {
    console.log("Hey it's a get request")
    res.send('Hello World2! get')
}).post('/', (req, res) => {
    console.log("Hey it's a post request")
    res.send('Hello World2! post')
}).put('/', (req, res) => {
    console.log("Hey it's a put request")
    res.send('Hello World2! put')
})

app.get("/index", (req, res) => {
    console.log("Hey it's index")
    res.sendFile('templat/index.html',{root: __dirname})
})

app.get("/api", (req, res) => {
    res.json({ a: 1, b: 2, c: 3, d: 4, name: ["ritesh", "jerry"] })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
