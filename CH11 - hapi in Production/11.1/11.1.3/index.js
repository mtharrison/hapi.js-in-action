'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        request.log(['my-request-tag'], 'Got a request');
        reply('Howdy!');
    }
});

server.register({
    register: require('good'),
    options: {
        reporters: [
            {
                reporter: require('good-console'),
                events: {
                    log: ['my-log-tag'],
                    request: ['my-request-tag']
                }
            }
        ]
    }
}, (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log(['my-log-tag'], 'Wohoo, the server has started!');
    });
});
