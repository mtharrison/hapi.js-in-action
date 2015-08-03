var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {

        Fs.writeFile('uploadedFile', request.payload.upload, function (err) {

            if (err) {
                throw err;
            }

            reply('ok');
        });
    },
    config: {
        payload: {
            parse: true,
            output: 'data'
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply.file('index.html');
    }
});

server.start(function () {

    console.log('Server started!');
});
