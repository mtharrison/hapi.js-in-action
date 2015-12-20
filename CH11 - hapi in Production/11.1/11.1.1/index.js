'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.on('start', () => {

    console.log('Server started!');
});

server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('hello');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
});
