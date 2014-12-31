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

server.method('create', function (recipe, next) {
    
    var sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, difficulty, cuisine, chef) VALUES (?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, 
        [
            recipe.name,
            recipe.cooking_time,
            recipe.prep_time,
            recipe.serves,
            recipe.difficulty,
            recipe.cuisine,
            recipe.chef,
        ], 
        function (err, results) {
            next(err, results);
        });
}, {});

server.method('star', function (recipe_id, awarded_by, next) {

    var sql = 'INSERT INTO stars (recipe_id, awarded_by) VALUES (?,?)';

    connection.query(sql, [recipe_id, awarded_by], function (err, results) {
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