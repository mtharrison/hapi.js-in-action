'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    config: {
        security: {
            hsts: {
                maxAge: 15768000,
                includeSubDomains: true,
                preload: true
            },
            xframe: 'sameorigin'
        }
    },
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('hi');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
