var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');


router.get('/', function(req, res, next)    {
    session = req.session;
    if(session.isUserLoggedIn)  {
        res.redirect('/main/index')
    }   else    {
        res.redirect('/user/register');
    }
});

router.get('/main/index', function(req, res, next) {
    
    res.render('main/index');
});

router.get('/main/profile', function(req, res, next) {

    res.render('main/profile');
});

router.post('/main/profile', function(req, res, next) {

    console.log('here we are');
});
module.exports = router;