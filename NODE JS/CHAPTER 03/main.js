const express = require("express")
const app = express()
const port = 3000

app.use(express.static('public'))

// app.get or app.port or app.put or app.delete(path,handler)
app.get('/',(req,res)=>{
    res.send('Hello world3')
})
app.get('/about',(req,res)=>{
    res.send('about us')
})
app.get('/contact',(req,res)=>{
    res.send('Hello contat')
})
app.get('/blog',(req,res)=>{
    res.send('Hello blog')
})
app.get('/blog/intro',(req,res)=>{
    res.send('Hello to my intro')
})


app.get('/blog/:slug',(req,res)=>{
    // logic to fetch {slug} from the db
    // For URL:http://localhost:3000/blog/intro-to-python?mode=dark&regin=in

    console.log(req.params) //will output params: { slug: 'intro-to-python' }
    console.log(req.query) // will output query: { mode: 'dark', regin: 'in' }
    res.send(`hello ${req.params.slug}`)
})



// app.get('/blog/intro/to-js',(req,res)=>{
//     res.send('so you are learning js')
// })
// app.get('/blog/intro/to-python', (req, res) => {
//     res.send('so you are learning python');
// });


app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})
