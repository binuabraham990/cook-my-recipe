var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');
const { body, validationResult } = require('express-validator');



router.get('/', function(req, res, next)    {
    session = req.session;
    if(session.isUserLoggedIn)  {
        res.redirect('/main/index')
    }   else    {
        res.redirect('/user/login');
    }
});

router.get('/main/index', function(req, res, next) {
    
    res.render('main/index');
});

router.get('/main/profile', function(req, res, next) {

    session = req.session;
    dbCon.query('Select * from cook where user_id = ? limit 1', session.userId, function(err, rows) {

        if(typeof(rows) == 'undefined' || (typeof(rows) == 'object' && Object.keys(rows).length == 0))    {
            res.render('main/profile', {'process': 'save', 'data': {}});
        }   else{
            res.render('main/profile', {'process': 'update', 'data': rows});
        }
    });
});

router.post('/main/profile/save', 
    body('name').isLength({min: 3}),
    body('nickname').isLength({min: 3}),

    
    function(req, res, next) {

        
        const errors = validationResult(req);
        session = req.session;

        if (!errors.isEmpty()) {
            req.flash('error', 'Please check the inserted values');
        }

        let data = req.body;
        data.user_id = session.userId


        dbCon.query('insert into cook set ?', data, function(err, result)   {
            if(err) {
                req.flash('error', 'Saving profile information failed.');
            }   else    {
                req.flash('success', 'Profile information saved');
            }
        });
        return res.redirect('/main/profile');
});

router.post('/main/profile/update', 

    body('name').isLength({min: 3}),
    body('nickname').isLength({min: 3}),

    function(req, res, next)    {

        const errors = validationResult(req);
        session = req.session;

        if (!errors.isEmpty()) {
            req.flash('error', 'Please check the inserted values');
        }

        let data = req.body;
        let userId = session.userId;

        dbCon.query('UPDATE cook SET name=?, nickname=?, designation=?, country=?, hobbies=?, youtube=?, instagram=? WHERE user_id=?', [
            data.name, data.nickname, data.designation, data.country, data.hobbies, data.youtube, data.instagram, userId
        ], function(err, result)    {
            if(err) {
                req.flash('error', 'Saving profile information failed.');
            }   else    {
                req.flash('success', 'Profile information saved');
            }
        });

        return res.redirect('/main/profile');
});
module.exports = router;