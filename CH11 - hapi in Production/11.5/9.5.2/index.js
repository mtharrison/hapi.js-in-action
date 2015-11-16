var Hapi = require('hapi');
var Fs = require('fs');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 80 });
server.connection({
    port: 443,
    tls: {
        key: Fs.readFileSync(Path.join(__dirname, 'server.key')),
        cert: Fs.readFileSync(Path.join(__dirname, 'server.crt'))
    }
});

server.start(function (err) {

    if (err) {
        throw err;
    }

    console.log('Started server!');
});
