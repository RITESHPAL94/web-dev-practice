/* Create a business name generator by combining list of adjectives and shop name and another word

Adjectives:
crazy
Amazing
Fire

Shop Name:
Engine
Foods
Garments

Another word:
Bros
Limited
Hub
*/

let adjective1 = "Crazy"
let adjective2 = "Amazing"
let adjective3 = "Fire"

let shop1 = "Engine"
let shop2 = "Foods"
let shop3 = "Garments"

let word1 = "Bros"
let word2 = "Limited"
let word3 = "Hub"

let random = Math.floor(Math.random() * 3) + 1
let random1 = Math.floor(Math.random() * 3) + 1
let random2 = Math.floor(Math.random() * 3) + 1

let adjective
let shop
let word

switch (random) {
    case 1:
        adjective = adjective1
        break;
    case 2:
        adjective = adjective2
        break;
    case 3:
        adjective = adjective3
        break;
}

switch (random1) {
    case 1:
        shop = shop1
        break;
    case 2:
        shop = shop2
        break;
    case 3:
        shop = shop3
        break;
}
switch (random2) {
    case 1:
        word = word1
        break;
    case 2:
        word = word2
        break;
    case 3:
        word = word3
        break;
}

console.log(`Your company name is ${adjective} ${shop} ${word}`)