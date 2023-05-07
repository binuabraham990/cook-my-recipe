const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const flash = require('express-flash');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const fileUpload = require("express-fileupload");


const mysql = require('mysql');
const connection = require('./lib/connection');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));

app.use(flash());
app.use(fileUpload());

var mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

var userRoutes = require('./routes/user');
app.use('/user', userRoutes);

var recipyRoutes = require('./routes/recipy');
app.use('/recipy', recipyRoutes);


app.listen(port, () => console.log(`Express app running on port ${port}!`));