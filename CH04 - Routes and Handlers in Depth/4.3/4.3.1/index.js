'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/avg',
    handler: function (request, reply) {

        const values = request.payload.values;
        const sum = values.reduce((a, b) => a + b);

        reply({ mean: sum / values.length });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
