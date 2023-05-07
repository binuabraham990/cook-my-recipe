var express = require('express');
var router = express.Router();
var dbCon = require('../lib/connection');
const bcrypt = require("bcrypt")

module.exports = {

    mapReuqestToArray: async function (requestBody) {
        let {name, nickname, designation, country, hobbies, youtube, instagram} = requestBody;
    }
}