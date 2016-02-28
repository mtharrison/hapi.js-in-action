'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({
    port: 4000,
    routes: {
        cors: true
    }
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {

                reply.file(Path.join(__dirname, 'index.html'));
            }
        }, {
            // config: {
            //     cors: true
            // },
            method: 'GET',
            path: '/resource',
            handler: function (request, reply) {

                reply('A resource');
            }
        }
    ]);

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
