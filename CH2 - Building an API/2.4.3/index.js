var Hapi = require('hapi');
var mysql = require('mysql');

var server = new Hapi.Server(4000);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dindin'
});

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
    connection.query('SELECT * FROM recipes WHERE id = ?', [id], next);
}, {});

server.route([{
    method: 'GET',
    path: '/recipes',
    handler: function(request, reply) {
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
}]);

server.start(function() {
    console.log('Server listening at:', server.info.uri);
});