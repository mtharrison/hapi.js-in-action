var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: ['GET', 'POST'],
    path: '/',
    handler: function (request, reply) {

        var method = request.method;
        reply('Route was matched for a ' + method + ' request');
    }
});

server.start(function () {
    console.log('Server started!');
});