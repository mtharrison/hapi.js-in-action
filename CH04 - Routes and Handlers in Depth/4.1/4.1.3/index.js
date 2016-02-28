'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

// Parameters

server.route({
    method: 'GET',
    path: '/nature/flowers/orchids/{image}.{ext}',
    handler: function (request, reply) {

        const image = request.params.image;
        const ext = request.params.ext;

        reply('You requested ' + image + '.' + ext);
    }
});

server.route({
    method: 'GET',
    path: '/images/{category}/{subcat1}/{subcat2}/{image}.{ext}',
    handler: function (request, reply) {

        console.log(JSON.stringify(request.params, null, 2));

        reply();
    }
});

// Multi

server.route({
    method: 'GET',
    path: '/{category*3}/{image}.{ext}',
    handler: function (request, reply) {

        console.log(JSON.stringify(request.params, null, 2));

        reply();
    }
});

server.route({
    method: 'GET',
    path: '/team/{name?}',
    handler: function (request, reply) {

        if (request.params.name) {
            return reply('Showing ' + request.params.name + '\'s page');
        }

        return reply('Showing the whole team page!');
    }
});

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: function (request, reply) {

        const path = request.params.path;
        return reply('Matched the catch-all route with path: ' + path);
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
