'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/image.png',
    handler: function (request, reply) {

        const response = reply.file(Path.join(__dirname, 'image.png'));
        response.header('Cache-Control', 'max-age=86400');
    }
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
