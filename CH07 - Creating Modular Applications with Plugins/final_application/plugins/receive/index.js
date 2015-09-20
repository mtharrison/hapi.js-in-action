var Joi = require('joi');

var after = function (server, next) {

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
        path: '/',
        handler: function (request, reply) {

            server.methods.database.addPing(request.payload, reply);
        }
    });

    next();
};

exports.register = function (server, options, next) {

    server.dependency('pingoo-database', after);
    next();
};

exports.register.attributes = require('./package');
