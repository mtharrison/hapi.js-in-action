var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var schema = {
    station: Joi.string().max(100).required(),
    datetime: Joi.date().required(),
    temp: Joi.number().min(-100).max(100).required(),
    humidity: Joi.number().min(0).max(100),
    precipitation: Joi.boolean(),
    windDirection: Joi.string()
        .valid(['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'])
};

server.route({
    method: 'POST',
    path: '/reports',
    handler: function (request, reply) {

        reply('Thanks for the report!');
    },
    config: {
        payload: {
            output: 'data'
        },
        validate: {
            payload: schema
        }
    }
});

server.start(function () {

    console.log('Started server');
});