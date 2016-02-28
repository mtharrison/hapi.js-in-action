'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([
    {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {}
    }, {
        method: 'GET',
        path: '/',
        handler: function (request, reply) {}
    }
]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
