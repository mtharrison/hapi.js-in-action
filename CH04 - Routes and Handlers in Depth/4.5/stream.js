var Hapi = require('hapi');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {

        var upload = request.payload.upload;
        var uploadName = request.payload.upload.hapi.filename;
        var destination = Path.join(__dirname, 'uploads', uploadName);

        upload.pipe(Fs.createWriteStream(destination));

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

server.start(function () {

    console.log('Server started!');
});
