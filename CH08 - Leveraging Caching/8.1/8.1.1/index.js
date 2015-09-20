var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/image.png',
    handler: function (request, reply) {

        var response = reply.file(Path.join(__dirname, 'image.png'));
        response.header('Cache-Control', 'max-age=86400');
    }
});

server.register(require('inert'), function (err) {

    if (err) {
        throw err;
    }

    server.start(function () {

        console.log('Server running at:', server.info.uri);
    });
});
