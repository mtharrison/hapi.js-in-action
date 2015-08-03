var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply(request.pre.poem);
    },
    config: {
        pre: [{
            assign: 'poem',
            method: function (request, reply) {

                Fs.readFile('./poem.txt', function (err, data) {

                    reply(data.toString());
                });
            }
        }]
    }
});

server.start(function () {

    console.log('Server started!');
});
