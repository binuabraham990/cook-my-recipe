const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');

const mysql = require('mysql');
const connection = require('./lib/connection');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false})
);
app.use(flash());

var dashboardRoutes = require('./routes/dashboard');
app.use('/', dashboardRoutes);

var userRoutes = require('./routes/user');
app.use('/user', userRoutes);


app.listen(port, () => console.log(`Express app running on port ${port}!`));