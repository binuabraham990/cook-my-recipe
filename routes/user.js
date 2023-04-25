var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');
const bcrypt = require("bcrypt")
var securityHelper = require('../utils/security');

router.get('/', function(req, res, next)    {
    
    res.send('Hello World from user !');
});

router.get('/register', function(req, res, next)    {
    res.render('user/register');
});

router.post('/register', function(req, res, next)   {
    
    let {email, password} = req.body;
    let data = {
        email:email,
        password: password,
    }
    let saved = securityHelper.hashPassword(data);
    if(saved)   {
        res.redirect('/user/login');
    }   else    {
        req.flash('error', 'Saving failed');
    }
});

router.get('/login', function(req, res, next)   {
    res.render('user/login');
});

router.post('/login', function(req, res, next) {

    let {email, password} = req.body;
    let data = {
        email:email,
        password: password,
    }

    dbCon.query('Select * from user where email = ? limit 1', email, function(err, rows) {
        if(!err) {
            let hash = rows[0].hash;
            let compared = securityHelper.comparePassword(password, hash);
         
            if(compared)   {
                session = req.session;
                session.isUserLoggedIn = true;
                session.userId = rows[0].id;
                res.redirect('/');
            }   else    {
                req.flash('error', 'Saving failed');
            }
           
        }
    });    
});

router.get('/logout', function(req, res, next)  {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;