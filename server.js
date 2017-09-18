const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

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
    //res.send('<h2>hello Express</h2>');
    // res.send({
    //     name: "robo",
    //     likes: [
    //         'Cricket',
    //         'Soccer'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome to my website'
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

app.listen(3000, () => {
    console.log('server started on port 3000');
});