var Boom = require('boom');
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/v4/users',
    handler: function (request, reply) {

        var err = Boom.notImplemented('Still working on this');
        reply(err);
    }
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
