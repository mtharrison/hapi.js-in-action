var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.method('poem', function (next) {

    Fs.readFile('./poem.txt', function (err, data) {

        next(data.toString());
    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply(request.pre.poem);
    },
    config: {
        pre: [
            'poem()'
        ]
    }
});

server.start();
