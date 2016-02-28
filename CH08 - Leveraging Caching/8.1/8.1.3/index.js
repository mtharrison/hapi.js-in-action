'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/image.png',
    handler: function (request, reply) {

        reply.file(Path.join(__dirname, 'image.png'));
    },
    config: {
        cache: {
            privacy: 'private',
            expiresIn: 86400 * 1000
        }
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
