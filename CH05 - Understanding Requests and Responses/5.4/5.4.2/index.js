var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/error',
    handler: function (request, reply) {

        reply('Internal server error').code(500);
    }
});

server.route({
    method: 'GET',
    path: '/js-error',
    handler: function (request, reply) {

        var err = new Error('Oh no, it didn\'t work!');
        reply(err);
    }
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
