const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let siteName = "Adidas"
    let searchtext = "search now"
    let arr = ["Hey", 54, 65]
    res.render("index", { siteName: siteName, searchtext: searchtext, arr })
});

app.get('/blog/:slug', (req, res) => {
    let blogTitle = "Adidas why and when?"
    let blogcontent = "Its a very good brand"
    res.render("blogpost", {blogTitle:blogTitle, blogcontent:blogcontent })
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});