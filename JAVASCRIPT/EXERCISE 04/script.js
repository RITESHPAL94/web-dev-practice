console.log("let's do it.")

let boxes = document.getElementsByClassName("box")
let color = ["red", "blue", "green", "purple", "yellow"]
let backgroundColor = ["aqua", "pink", "lightblue", "lightgreen", "lavender",]

for (let index = 0; index < boxes.length; index++) {
    boxes[index].style.color = color[Math.floor(Math.random() * color.length)]
    boxes[index].style.backgroundColor = backgroundColor[Math.floor(Math.random() * backgroundColor.length)]
}