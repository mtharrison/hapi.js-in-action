'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
    method: 'GET',
    path: '/document',
    handler: function (request, reply) {

        reply(1);
    }
}, {
    method: 'GET',
    path: '/document/{id}',
    handler: function (request, reply) {

        reply(2);
    }
}, {
    method: 'GET',
    path: '/document/{id}.xml',
    handler: function (request, reply) {

        reply(3);
    }
}, {
    method: 'GET',
    path: '/document/{path*}',
    handler: function (request, reply) {

        reply(4);
    }
}]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
