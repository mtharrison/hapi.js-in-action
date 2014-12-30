var Hapi = require('hapi');
var server = new Hapi.Server(4000);
var recipes = require('./recipes');

server.route({
	method: 'GET',
	path: '/recipes',
	handler: function(request, reply) {
		reply(recipes);
	}
});

server.start(function(){
	console.log('Server listening at:', server.info.uri);
});