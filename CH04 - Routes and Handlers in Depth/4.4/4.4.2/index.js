var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply(new Error('Hii'));
    },
    config: {
        pre: [{
            assign: 'poem',
            method: function (request, reply) {

                Fs.readFile('./poem.txt', function (err, data) {

                    reply(data.toString());
                });
            },
            failAction: function () {
                
                console.log(arguments);
            }
        }]
    }
});

server.start(function () {

    console.log('Server started!');
});
