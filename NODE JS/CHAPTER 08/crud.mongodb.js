
//DB
use("crudDB")

console.log(db)

db.createCollection("courses")


// INSERT
db.courses.insertOne({
    name: "ritesh web dev free courses",
    price : 0,
    assisgment: 12,
    project: 45
})

// READ
let a = db.courses.find({price: 0})
console.log(a.toArray())

// UPDATE
db.courses.updateOne({price: 0}, {$set:{price:100}})

db.courses.updateMany({price: 100}, {$set:{price:1000}})

// DELETE
db.courses.deleteOne({price: 1000})

db.courses.deleteMany({price: 1000})

