var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([
	{
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {}
	}, {
	    method: 'GET',
	    path: '/',
	    handler: function (request, reply) {}
	}
]);

server.start(function () {
    console.log('Server started!');
});