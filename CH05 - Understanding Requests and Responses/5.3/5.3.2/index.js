'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
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

        const err = new Error('Oh no, it didn\'t work!');
        reply(err);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
