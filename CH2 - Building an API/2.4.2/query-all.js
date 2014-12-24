var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'XXX',
    password : 'XXX',
    database : 'dindin'
});

connection.query('SELECT * FROM recipes', function(err, rows) {

    if (err) throw err;

    for(var i = 0; i < rows.length; i++) {
        console.log(rows[i].name);
    }
});