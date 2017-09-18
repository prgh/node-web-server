const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
        console.log("unable to append to server.log");
        }
    });
    console.log(log);
    next();
});

// app.use((req,resp,next)=>{
//     resp.render('maintenance.hbs',{
//         welcomeMsg: 'The site is currently being updated'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome to my website'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        welcomeMsg: 'Portfolio'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage: 'bad request'
    });
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});