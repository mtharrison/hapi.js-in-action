var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.method('poem', function (request, reply) {

    Fs.readFile('./poem.txt', function (err, data) {

        reply(data.toString());
    });
});

server.route({
    config: {
        pre: [
            'poem'
        ]
    },
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply(request.pre.poem);
    }
});

server.start();
