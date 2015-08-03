var Hapi = require('hapi');
var Path = require('path');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {

        var targetPath = Path.join(__dirname, request.payload.upload.filename);
        var tempPath = request.payload.upload.path;

        Fs.rename(tempPath, targetPath, function (err) {

            if (err) {
                throw err;
            }

            reply('ok');
        });
    },
    config: {
        payload: {
            parse: true,
            output: 'file'
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
