var Hapi = require('hapi');

var server = new Hapi.Server({
    debug: {
        request: ['info']
    }
});
server.connection({ port: 4000 });

server.register(require('./id-logger'), function (err) {

    if (err) {
        throw err;
    }

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Server started');
    });
});
