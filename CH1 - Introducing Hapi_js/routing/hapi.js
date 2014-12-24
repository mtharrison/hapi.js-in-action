var Hapi = require('hapi');

var server = new Hapi.Server(4000);

server.route([{
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		reply('Hello GET!');
	}
}, {
	method: 'POST',
	path: '/',
	handler: function(request, reply) {
		reply('Hello POST!');
	}
}, {
	method: 'GET',
	path: '/{name}',
	handler: function(request, reply) {
		reply('Hello ' + encodeURIComponent(request.params.name));
	}
}]);

server.start();