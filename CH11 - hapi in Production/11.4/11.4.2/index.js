'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        debugger;
        reply(request.headers['X-Custom-Header']);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Started server');
});
