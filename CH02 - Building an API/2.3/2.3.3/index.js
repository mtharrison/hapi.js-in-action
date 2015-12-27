'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');

const db = new Sqlite3.Database('../../dindin.sqlite');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
    method: 'GET',
    path: '/api/recipes',
    handler: function (request, reply) {

        db.all('SELECT * FROM recipes', (err, results) => {

            if (err) {
                throw err;
            }

            reply(results);
        });
    }
}]);

server.start(() => {

    console.log('Server listening at:', server.info.uri);
});
