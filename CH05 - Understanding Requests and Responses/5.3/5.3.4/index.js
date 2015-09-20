var Boom = require('boom');
var Hapi = require('hapi');
var Joi = require('joi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
    method: 'GET',
    path: '/error',
    handler: function (request, reply) {

        reply(new Error('Something bad happened!'));
    }
}, {
    method: 'GET',
    path: '/newFeature',
    handler: function (request, reply) {

        reply(Boom.notImplemented());
    }
}, {
    config: {
        validate: {
            params: {
                name: Joi.string().min(4)
            }
        }
    },
    method: 'GET',
    path: '/name/{name}',
    handler: function (request, reply) {

        reply('OK');
    }
}]);

server.ext('onPreResponse', function (request, reply) {

    if (request.response.isBoom) {
        var err = request.response;
        var errName = err.output.payload.error;
        var statusCode = err.output.payload.statusCode;

        return reply.view('error', {
            statusCode: statusCode,
            errName: errName
        })
        .code(statusCode);
    }

    reply.continue();
});


server.register(require('vision'), function () {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, 'templates')
    });

    server.start(function () {

        console.log('Server running at:', server.info.uri);
    });
});
