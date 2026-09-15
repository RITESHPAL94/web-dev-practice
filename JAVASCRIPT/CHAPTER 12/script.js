let button = document.getElementById("btn")
button.addEventListener("dblclick", ()=>{
    // alert("i was clicked")
    document.querySelector(".box").innerHTML = "yay you were <b> enjoy your click</b>"

})
button.addEventListener("contextmenu", ()=>{
    alert("don't hack us using right clicked")

})
document.addEventListener("keydown", (e)=>{
    console.log(e.key,e.keyCode)

})