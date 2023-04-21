var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cook_my_recipe'
});

connection.connect(function(error)  {
  //  console.log(error);
});

module.exports = connection;