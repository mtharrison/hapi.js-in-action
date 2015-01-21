var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 4000});

server.register(require('dindin-api'),
	function (err) {

	if (err) {
		throw err;
	}

	server.start(function () {
		console.log('Started server at', server.info.uri);
	});
});