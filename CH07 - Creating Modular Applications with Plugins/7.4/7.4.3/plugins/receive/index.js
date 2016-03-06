'use strict';

const Joi = require('joi');

exports.register = function (server, options, next) {

    server.route({
        config: {
            validate: {
                payload: {
                    code: Joi.string().required(),
                    lat: Joi.number().required(),
                    lng: Joi.number().required(),
                    alt: Joi.number().required(),
                    timestamp: Joi.date().required()
                }
            }
        },
        method: 'POST',
        path: '/api',
        handler: function (request, reply) {

            server.methods.database.addPing(request.payload, reply);
            server.events.emit('newPing', request.payload);
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package')
};
