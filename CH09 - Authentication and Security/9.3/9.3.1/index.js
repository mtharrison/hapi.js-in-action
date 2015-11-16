var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('inert'), function (err) {

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                reply.file(Path.join(__dirname, 'index.html'));
            }
        }, {
            config: {
                cors: true
            },
            method: 'GET',
            path: '/resource',
            handler: function (request, reply) {

                reply('A resource');
            }
        }
    ]);

    server.start(function () {

        console.log('Started server');
    });
});
