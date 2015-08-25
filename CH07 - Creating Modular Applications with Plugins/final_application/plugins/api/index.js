var Joi = require('joi');

var after = function (server, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            server.methods.database.getRecent(reply);
        }
    });

    server.route({
        method: 'GET',
        path: '/flight/{flight}',
        handler: function (request, reply) {

            server.methods.database.getRecent(request.params.flight, reply);
        }
    });

    next();
};

exports.register = function (server, options, next) {

    server.dependency('pingoo-database', after);
    next();
};

exports.register.attributes = require('./package');
