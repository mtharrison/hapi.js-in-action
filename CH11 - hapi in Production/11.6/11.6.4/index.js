const Hapi = require('hapi');
const Fs = require('fs');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 80 });
server.connection({
    port: 443,
    tls: {
        key: Fs.readFileSync(Path.join(__dirname, 'server.key')),
        cert: Fs.readFileSync(Path.join(__dirname, 'server.crt'))
    }
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
