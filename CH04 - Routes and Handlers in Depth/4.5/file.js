'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Fs = require('fs');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'POST',
        path: '/upload',
        handler: function (request, reply) {

            const targetPath = Path.join(__dirname, Path.basename(request.payload.upload.filename));
            const tempPath = request.payload.upload.path;

            Fs.rename(tempPath, targetPath, (err) => {

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

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
