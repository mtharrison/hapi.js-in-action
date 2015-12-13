'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

module.exports = function (callback) {

    const server = new Hapi.Server();
    server.connection({ port: 4000 });

    server.route([{
        config: {
            validate: {
                query: {
                    a: Joi.number(),
                    b: Joi.number()
                }
            }
        },
        method: 'GET',
        path: '/add',
        handler: function (request, reply) {

            reply(request.query.a + request.query.b);
        }
    }, {
        config: {
            validate: {
                query: {
                    a: Joi.number(),
                    b: Joi.number()
                }
            }
        },
        method: 'GET',
        path: '/multiply',
        handler: function (request, reply) {

            reply(request.query.a * request.query.b);
        }
    }]);

    callback(null, server);
};
