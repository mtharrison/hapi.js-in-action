'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/avg',
    handler: function (request, reply) {

        const values = request.payload.values;
        let sum = 0;

        for (let i = 0; i < values.length; ++i) {
            sum += values[i];
        }

        const mean = sum / values.length;
        reply({ mean: mean });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
