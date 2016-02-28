'use strict';

const Hapi = require('hapi');
const Fs = require('fs');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.method('poem', (request, reply) => {

    Fs.readFile('./poem.txt', (err, data) => {

        if (err) {
            throw err;
        }
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

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
