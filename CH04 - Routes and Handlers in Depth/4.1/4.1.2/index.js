'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: ['GET', 'POST'],
    path: '/',
    handler: function (request, reply) {

        const method = request.method;
        reply('Route was matched for a ' + method + ' request');
    }
});

server.start(() => {

    console.log('Server started!');
});
