var Hapi = require('hapi');
var mysql = require('mysql');

var server = new Hapi.Server();
server.connection({port: 4000});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dindin'
});

// Server methods

server.method('search', function (cuisine, next) {

    var sql = 'SELECT * FROM recipes';
    var sqlParams = [];

    if (cuisine) {
        sql += ' WHERE cuisine = ?';
        sqlParams = [cuisine];
    }

    connection.query(sql, sqlParams, function (err, results) {
        next(err, results);
    });
}, {});

server.method('retrieve', function (id, next) {
    connection.query('SELECT * FROM recipes WHERE id = ?', [id], function (err, results) {
        next(err, results ? results[0] : null);       
    });
}, {});

server.method('create', function (recipe, next) {
    
    var sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, 
        [
            recipe.name,
            recipe.cooking_time,
            recipe.prep_time,
            recipe.serves,
            recipe.cuisine,
            recipe.ingredients,
            recipe.user_id,
        ], 
        function (err, results) {
            next(err, results);
        });
}, {});

server.method('star', function (id, next) {

    var sql = 'UPDATE recipes SET stars = stars + 1 WHERE id = ?';

    connection.query(sql, [id], function (err, results) {
        next(err, results);
    });
}, {});

// Routing

server.route(require('./routes'));

server.start(function () {
    console.log('Server listening at:', server.info.uri);
});