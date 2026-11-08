// Generate a dummy data in this format in a collection called employees in a db called company

//{
// name: "Ritesh",
// salary: 450000,
// language: "Python",
// city: "Tokyo",
// isMangaer: true
//}

// Generate 10 such records when a button called generate data is clicked!
// Create an Express app with Mongoose to acheive it
// Everytime the button is clicked, you should clear the collections


import mongoose from "mongoose";
import express from "express";
import { employee } from "./company/employee.js";

let port = 3000
let app = express()

// db connected
let con = await mongoose.connect("mongodb://localhost:27017/company")
console.log("Mongodb connected")

app.get('/', (req, res) => {
    res.send("hello world!")
})

app.get('/generate', async (req, res) => {
    let names = ["Ritesh", "Rahul", "Raj"];
    let languages = ["Python", "Java", "C++"];
    let cities = ["Tokyo", "New York", "Delhi"];

    const randomname = names[Math.floor(Math.random() * names.length)]
    const randomlanguage = languages[Math.floor(Math.random() * languages.length)]
    const randomcities = cities[Math.floor(Math.random) * cities.length]

    const Employee = new employee({
        name : randomname,
        salary: Math.floor(Math.random() * 45000 + 50000),
        language: randomlanguage,
        city: randomcities,
        isManager: Math.random()>0.5
    }) 

    await Employee.save()
    res.send("Employee created succesfully")

})

app.listen(port, () => {
    console.log(` Example app is listening in ${port}`)
})
