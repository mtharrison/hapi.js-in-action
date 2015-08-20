var Hapi = require('hapi');
var Wreck = require('wreck');
var Promise = require('bluebird');

var server = new Hapi.Server();

server.connection({ port: 4000 });



server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('Hello')
            .type('text/plain')
            .code(202)
            .header('x-powered-by', 'hapi');
    }
});

server.ext('onPreResponse', function (request, reply) {

    var response = request.response;
    console.log(response.statusCode);
    console.log(response.headers);
    reply.continue();
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
