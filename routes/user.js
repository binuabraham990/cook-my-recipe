var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');
var flash = require('express-flash');
const session = require('express-session');

router.get('/', function(req, res, next)    {
    
    res.send('Hello World from user !');
});

router.post('/register', function(req, res, next)   {
    console.log('register');
});

module.exports = router;