// let http = require('http');
// import http from "http"





// let hostname = "127.0.0.1"
// const port = 3000
// const server = http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('<h1> Hello World!</h1> ');
// })
// server.listen(port, hostname, () =>{
//     console.log(`server running at http://${hostname}:${port}/`)
// })



// import {a, b ,c ,d} from "./mymodule.js"
// console.log(a,b,c,d)
// Named export

import ritesh from "./mymodule.js";
console.log(ritesh)
// Default export

// const a = require("./mymodule2.js")

// console.log(a)