var Hapi = require('hapi');
var Mysql = require('mysql');

var connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dindin'
});

var server = new Hapi.Server();
server.connection({port: 4000});

server.route([{
    method: 'GET',
    path: '/recipes',
    handler: function (request, reply) {

        var sql = 'SELECT * FROM recipes';
        var params = [];

        if (request.query.cuisine) {
            sql += ' WHERE cuisine = ?';
            params.push(request.query.cuisine);
        }

        connection.query(sql, params, function (err, results) {

            if (err) {
                throw err;
            }

            reply(results);
        });
    }
}]);

server.start(function () {
    console.log('Server listening at:', server.info.uri);
});