var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var multiplier = function (x, next) {

    setTimeout(function () {

        next(null, x * 42);
    }, 2000);
};

server.method('multiplier', multiplier, {
    cache: {
        expiresIn: 5000
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var startTime = Date.now();

        console.log('Received a new request at', startTime, 'ms');

        server.methods.multiplier(request.query.x, function (err, result) {

            console.log('Got the value in', Date.now() - startTime, 'ms');
            reply(result);
        });
    }
});

server.start();
