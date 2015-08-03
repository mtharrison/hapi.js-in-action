var Boom = require('boom');
var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/boom',
    handler: function (request, reply) {

        Fs.readFile('/not/a/real/filepath', function (err) {

            if (err) {
                return reply(Boom.badRequest('Didn\'t something very bad'));
            }

            reply('ok');
        });
    }
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
