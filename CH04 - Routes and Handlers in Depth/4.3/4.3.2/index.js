'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

const mean = function (values, next) {

    let sum = 0;

    for (let i = 0; i < values.length; ++i) {
        sum += values[i];
    }

    return next(null, sum / values.length);
};

server.method('mean', mean, {});

server.route({
    method: 'POST',
    path: '/avg',
    handler: function (request, reply) {

        server.methods.mean(request.payload.values, (err, result) => {

            if (err) {
                throw err;
            }
            reply({ mean: result });
        });
    }
});

server.start(() => {

    console.log('Server started!');
});
