var Hapi = require('hapi');
var Sqlite3 = require('sqlite3');

var db = new Sqlite3.Database('../../dindin.sqlite');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
    method: 'GET',
    path: '/api/recipes',
    handler: function (request, reply) {

        db.all('SELECT * FROM recipes', function (err, results) {

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
