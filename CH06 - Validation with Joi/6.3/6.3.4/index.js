var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/{var}',
    handler: function (request, reply) {

        reply('Everything was ok.');
    },
    config: {
        validate: {
            params: {
                id: Joi.number().min(10).max(20)
            },
            headers: {
                test: Joi.string().required()
            },
            query: {
                thing: Joi.number().required()
            },
            failAction: function (request, reply, source, error) {

                reply(source + ' contained an invalid field.').code(400);
            }
        }
    }
});

server.start(function () {

    console.log('Server started');
});
