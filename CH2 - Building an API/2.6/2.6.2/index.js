var Hapi = require('hapi');
var mysql = require('mysql');

// Set up mysql

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dindin'
});

// Create Hapi server

var server = new Hapi.Server();
server.connection({port: 4000});

// Server methods

server.method('search', function(query, next) {

    var sql = 'SELECT * FROM recipes';
    var queryParams = [];

    if (query.cuisine) {
        sql += ' WHERE cuisine = ?';
        queryParams.push(query.cuisine);
    }

    connection.query(sql, queryParams, next);
}, {});

server.method('retrieve', function(id, next) {
    console.log('Going to the database...');
    connection.query('SELECT * FROM recipes WHERE id = ?', [id], next);
}, {
    cache: {
        expiresIn: 60 * 60
    }
});

server.method('create', function(recipe, next) {
    
    var sql = 'INSERT INTO recipes \
        (name, cooking_time, prep_time, serves, difficulty, cuisine, chef) \
        VALUES (?, ?, ?, ?, ?, ?, ?)';

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
        next);

}, {});

server.method('star', function(recipe_id, awarded_by, next) {
    connection.query('INSERT INTO stars (recipe_id, awarded_by) VALUES (?,?)', 
        [recipe_id, awarded_by], next);
}, {});

// Register auth

server.register(require('hapi-auth-basic'), function (err) {

    if(err) throw err;

    server.auth.strategy('api', 'basic', { 
        validateFunc: function(username, password, callback) {
            // Validation logic goes here
        }
    });

    // Routing

    server.route([{
        method: 'GET',
        path: '/recipes',
        config: {
            auth: 'simple'
        },
        handler: function(request, reply) {
            debugger;
            server.methods.search(request.query, function(err, results){

                if(err) {
                    throw err;
                }

                reply(results);
            });
        }
    },
    {
        method: 'GET',
        path: '/recipes/{id}',
        handler: function(request, reply) {
            server.methods.retrieve(request.params.id, function(err, results){

                if(err) {
                    throw err;
                }

                reply(results);
            });
        }
    },
    {
        method: 'POST',
        path: '/recipes',
        config: {
            payload: {
                parse: true,
                output: 'data'
            }
        },
        handler: function(request, reply) {
            server.methods.create(request.payload, function(err, results){

                if(err) {
                    throw err;
                }

                reply({status: 'ok'});
            });
        }
    },
    {
        method: 'POST',
        path: '/recipes/{id}/star',
        handler: function(request, reply) {
            server.methods.star(request.params.id, 1, function(err, results){

                if(err) {
                    throw err;
                }

                reply({status: 'ok'});
            });
        }
    }]);

    // Start server

    server.start(function() {
        console.log('Server listening at:', server.info.uri);
    });
});