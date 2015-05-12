var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route([{
	method: 'GET',
	path: '/test',
	handler: function (request, reply) { reply('ok'); }
}, {
	method: 'GET',
	path: '/test.{ext}',
	handler: function (request, reply) { reply('ok'); }
}, {
	method: 'GET',
	path: '/test/{param}',
	handler: function (request, reply) { reply('ok'); }
}, {
	method: 'GET',
	path: '/{p*}',
	handler: function (request, reply) { reply('ok'); }
}]);


// console.log(server.table()[0].table);

server.start();