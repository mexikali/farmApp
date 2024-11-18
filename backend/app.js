const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();

// DB Connection
mongoose.connect('mongodb://localhost/farmApp-db').then( () => {
    console.log("DB CONNECTED SUCCESSFULY");
    }).catch( (err) => {
        console.log("ERROR OCCURED WHILE CONNECTING TO DB", err);
});

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'farmAppSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/farmApp-db'})
}));


// Routes
app.use('/', (req, res) => {
    res.send("This is the backend of FarmApp...");
});


const port = 5000;
app.listen(port, () => {
    console.log("FarmApp Backend is running on port:",port);
    console.log(`http://localhost:${port}/`);
});