var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {

        var write = Fs.createWriteStream(request.payload.upload.hapi.filename);
        request.payload.upload.pipe(write);
        
        reply('ok');
    },
    config: {
        payload: {
            parse: true,
            output: 'stream'
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

server.start();
