'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            request.log(['my-request-tag'], 'Got a request');
            reply('Howdy!');
        }
    },
    {
        method: 'GET',
        path: '/error',
        handler: function (request, reply) {

            throw new Error('An error');
        }
    }
]);

server.register({
    register: require('good'),
    options: {
        reporters: [
            {
                config: 'error.log',
                reporter: require('good-file'),
                events: {
                    error: '*'
                }
            },
            {
                config: 'debug.log',
                reporter: require('good-file'),
                events: {
                    log: '*',
                    request: '*',
                    response: '*'
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
