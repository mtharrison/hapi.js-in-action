var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

// Parameters

server.route({
    method: 'GET',
    path: '/nature/flowers/orchids/{image}.{ext}',
    handler: function (request, reply) {

        var image = request.params.image;
        var ext = request.params.ext;

        reply('You requested ' + image + '.' + ext);
    }
});

// Commented out because will cause a route conflict
//
// server.route({
//     method: 'GET',
//     path: '/{category}/{subcat1}/{subcat2}/{image}.{ext}',
//     handler: function (request, reply) {

//         console.log(JSON.stringify(request.params, null, 2));

//         reply();
//     }
// });

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

        var path = request.params.path;
        return reply('Matched the catch-all route with path: ' + path);
    }
});

server.start(function () {
    console.log('Server started!');
});