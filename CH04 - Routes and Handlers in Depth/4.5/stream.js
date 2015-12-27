'use strict';

const Hapi = require('hapi');
const Fs = require('fs');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/upload',
    handler: function (request, reply) {

        const upload = request.payload.upload;
        const uploadName = request.payload.upload.hapi.filename;
        const destination = Path.join(__dirname, 'uploads', uploadName);

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

server.start(() => {

    console.log('Server started!');
});
