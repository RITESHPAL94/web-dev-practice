import mongoose from "mongoose"
import express from "express"
import { Todo } from "./modules/Todo.js"

let conn = await mongoose.connect("mongodb://localhost:27017/todo")

let app = express()
const port = 3000

app.get('/', (req, res) => {
    const todo = new Todo({  desc: "Description of this todo", isDone: false, days: Math.floor(Math.random() *45 + 5 * Math.random()) })
    todo.save()
    res.send('hello world')
})

app.get('/a', async(req, res) => {
    let todo = await Todo.findOne({})
    res.json({title: todo.title, desc: todo.desc})
})

app.listen(port, () => {
    console.log(`Example app is listening on ${port}`)
})