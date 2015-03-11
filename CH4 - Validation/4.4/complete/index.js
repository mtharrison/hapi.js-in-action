var Hapi = require('hapi');
var Joi = require('joi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000});

server.views({
	engines: {
		hbs: require('handlebars')
	},
	path: Path.join(__dirname, 'views'),
	helpersPath: Path.join(__dirname, 'views/helpers'),
	isCached: false,
	layout: true
});

server.route([{
	method: 'GET',
	path: '/',
	handler: function (request, reply) {

		reply.view('index');
	}
}, {
	method: 'POST',
	path: '/',
	handler: function (request, reply) {
		console.log(request.payload);
		reply.redirect('/success');
	},
	config: {
		validate: {
			payload: {
				name: Joi.string().required(),
				email: Joi.string().email().required(),
				age: Joi.number().required(),
				coffee: Joi.string().required().valid(['flat_white','latte','capuccino','americano']),
				password: Joi.string().required().min(6).max(32),
			},
			options: {
				abortEarly: false,
				convert: false
			},
			failAction: function (request, reply, source, error) {

				var errors = {};
				var details = error.data.details;

				for(var i = 0; i < details.length; i++) {
					if (!errors.hasOwnProperty(details[i].context.key)) {
						errors[details[i].context.key] = details[i].message;
					}
				}

				reply.view('index', {
					errors: errors,
					values: request.payload
				}).code(400);
			}
		}
	}
}, {
	method: 'GET',
	path: '/success',
	handler: function (request, reply) {

		reply.view('success');
	}
}]);

server.register([], function (err) {

	if(err) {
		throw err;
	}
	
	server.start(function () {
		console.log('Started server');
	});
});