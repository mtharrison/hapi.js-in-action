'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/en',
    handler: function (request, reply) {

        reply('Hello!');
    }
});

const plugin = function (server, options, next) {

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

server.register(plugin, (err) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
