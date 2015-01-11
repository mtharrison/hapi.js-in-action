var Hapi = require('hapi');
var mysql = require('mysql');
var Bcrypt = require('bcrypt');

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

server.method('create', function (recipe, user_id, next) {
    
    var sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, directions, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, 
        [
            recipe.name,
            recipe.cooking_time,
            recipe.prep_time,
            recipe.serves,
            recipe.cuisine,
            recipe.ingredients,
            recipe.directions,
            user_id,
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

// Plugin registration

server.register(require('hapi-auth-basic'), function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('api', 'basic', { 
        validateFunc: function (username, password, callback) {

            connection.query('SELECT * FROM users WHERE username = ?', [username], function (err, results) {

                if (err) {
                    return callback(err, false);
                }

                if (results.length !== 1) {
                    return callback(null, false);                    
                }

                var user = results[0];

                Bcrypt.compare(password, user.password, function (err, isValid) {
                    callback(err, isValid, { id: user.id, username: user.username });
                });

            });
        }
    });

    server.route(require('./routes'));

    server.start(function () {
        console.log('Server listening at:', server.info.uri);
    });
});