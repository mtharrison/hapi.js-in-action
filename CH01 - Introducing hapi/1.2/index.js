var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/en',
    handler: function (request, reply) {

        reply('Hello!');
    }
});

var plugin = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/cn',
        handler: function (request, reply) {

            reply('你好!');
        }
    });

    next();
};
plugin.attributes = {
    name: 'My plugin'
};

server.register(plugin, function (err) {

    if (err) {
        throw err;
    }
    server.start(function (err) {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
