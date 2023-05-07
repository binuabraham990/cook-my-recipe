var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');
const bcrypt = require("bcrypt")

module.exports = {

    hashPassword:async function (data) {
        const hash = await bcrypt.hash(data.password, 10);
        return hash;
    },

    comparePassword: async function (plaintextPassword, hash) {
        const result = await bcrypt.compare(plaintextPassword, hash);
        return result;
    },

    saveRegistration: async function(data, hash)  {

        data.hash = hash;
        data.active = true;
            
        dbCon.query('insert into user set ?', data, function(err, result)   {
            if(err) {
                return err;
            }   else    {
                return true;
            }
        });
    }
}