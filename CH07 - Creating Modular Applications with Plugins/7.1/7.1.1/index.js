var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.register(plugin, function (err) {

    if (err) {
        throw err;
    }

    server.start(function (err) {

        if (err) {
            throw err;
        }

        console.log('Started server');
    });
});
