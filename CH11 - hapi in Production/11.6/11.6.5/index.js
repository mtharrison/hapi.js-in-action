'use strict';

const Hapi = require('hapi');
const Fs = require('fs');
const Path = require('path');

const server = new Hapi.Server({
    connections: {
        routes: {
            security: {
                hsts: true  // ensures that strict-transport-security header is set
            }
        }
    }
});

server.connection({ port: process.env.HTTP_PORT || 80 });    // insecure connection
server.connection({                                          // secure connection
    port: process.env.HTTPS_PORT || 443,
    tls: {
        key: Fs.readFileSync(Path.join(__dirname, 'server.key')),
        cert: Fs.readFileSync(Path.join(__dirname, 'server.crt'))
    }
});

// Redirect all non-secure traffic to https://...

server.ext('onRequest', (request, reply) => {

    if (request.connection.info.protocol === 'http') {
        const secureURL = 'https://' + request.info.host + request.url.path;
        return reply.redirect(secureURL);
    }
    reply.continue();
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('Welcome Home!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Started server!');
});
