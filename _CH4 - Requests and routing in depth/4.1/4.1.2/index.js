var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

// From example 1

server.ext('onRequest', function (request, reply) {

    var formatString = '%s: New request received from %s';
    console.log(formatString, new Date(), request.info.remoteAddress);
    reply.continue();
});

// From example 2

server.ext('onPreHandler', function (request, reply) {

    if (typeof request.payload === 'string') {
        return reply.continue();
    }

    var replacements = {
        quick: 'slow', 
        fox: 'pig', 
        lazy: 'astute'
    };

    for(var i in replacements) {
        var regex = new RegExp(i, 'g');
        request.payload = request.payload.replace(regex, replacements[i]);
    }

    reply.continue();
});

server.route({
    method: 'POST',
    path: '/replace',
    handler: function (request, reply) {

        reply(request.payload);
    }
})

server.start(function () {
    console.log('Server listening at:', server.info.uri);
});