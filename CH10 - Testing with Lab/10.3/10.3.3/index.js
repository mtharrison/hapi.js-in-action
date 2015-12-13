'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

module.exports = function (callback) {

    const server = new Hapi.Server();
    server.connection({ port: 4000 });

    const schema = {
        name: {
            first: Joi.string().required(),
            last: Joi.string().required()
        },
        age: Joi.number().required()
    };

    server.route({
        config: {
            validate: {
                payload: schema
            }
        },
        method: 'POST',
        path: '/user',
        handler: function (request, reply) {

            const user = request.payload;
            user.createdAt = Date.now();
            reply(user);
        }
    });

    callback(null, server);
};
