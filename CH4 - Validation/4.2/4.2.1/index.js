var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();
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

server.start(function () {

	console.log('Started server');
});