'use strict';

const Boom = require('boom');
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/v4/users',
    handler: function (request, reply) {

        const err = Boom.notImplemented('Still working on this');
        reply(err);
    }
});

server.start(() => {

    console.log('Server running at:', server.info.uri);
});
