import mongoose from "mongoose"

const Todoschema = new mongoose.Schema({
    name: {type: String, required: true, default: "Hey"},
    desc: String,
    isDone: Boolean,
    days : Number
})

export const  Todo = mongoose.model('Todo', Todoschema)
