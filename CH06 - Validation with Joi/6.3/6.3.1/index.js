'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/products/{id}',
    handler: function (request, reply) {

        reply('Success');
    },
    config: {
        validate: {
            params: {
                id: Joi.number().integer().min(1)
            }
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Started server');
});
