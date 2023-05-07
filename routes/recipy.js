var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');
const path = require('path');


router.get('/index', function(req, res, next)   {
    
    res.render('recipy/index');
});

router.get('/add', function(req, res, next) {
    res.render('recipy/add');
});

router.post('/save', function(req, res, next) {

    const file = req.files.images;
    const filePath = path.join(__dirname, '../public/uploads/' + file.name);
    
    file.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        let data = req.body;
        data.images = file.name;
        dbCon.query('insert into recipies set ?', data, function(err, result)   {
            if(err) {
                req.flash('error', 'Saving profile information failed.');
            }   else    {
                req.flash('success', 'Profile information saved');
                
            }
        });
        res.redirect('/recipy/index');
    });
});

module.exports = router;