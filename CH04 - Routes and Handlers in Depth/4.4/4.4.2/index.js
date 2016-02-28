'use strict';

const Hapi = require('hapi');
const Fs = require('fs');

const server = new Hapi.Server();
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

                Fs.readFile('./poem.txt', (err, data) => {

                    if (err) {
                        throw err;
                    }
                    reply(data.toString());
                });
            }
        }]
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
