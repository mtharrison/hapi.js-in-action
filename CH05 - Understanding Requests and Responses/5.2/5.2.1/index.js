'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
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

server.ext('onPreResponse', (request, reply) => {

    const response = request.response;
    console.log(response.statusCode);
    console.log(response.headers);
    reply.continue();
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
