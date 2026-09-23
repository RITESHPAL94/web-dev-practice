// let obj = {
//     a : 1,
//     b : "Ritesh"
// }

// console.log(obj)

// let animal = {
//     eats : true
// }
// let rabbit = {
//     jump : true
// }

// rabbit.__proto__ = animal

class Animal {
    constructor(name) {
        this.name = name
        console.log("Object is created...")
    }

    eats(){
        console.log("kha raha hu")
    }

    jump(){
        console.log("jump kar raha hu")
    }
}


class Lion extends Animal{
    constructor(name){
        super(name)
        this.name = name
        console.log("Object is created and he is a lion....")
    }
    eats(){
        super.eats()
        console.log("kha raha hu roar")
    }
}

let a = new Animal("Bunny")
console.log(a)

let l = new Lion ("shera")
console.log(l)