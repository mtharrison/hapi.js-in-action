var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var mean = function (values, next) {

    var sum = 0;

    for (var i = 0; i < values.length; i++) {
        sum += values[i];
    }

    return next(null, sum / values.length);
};

server.method('mean', mean, {});

server.route({
    method: 'POST',
    path: '/avg',
    handler: function (request, reply) {

        server.methods.mean(request.payload.values, function (err, result) {

            reply({ mean: result });
        });
    }
});

server.start(function () {

    console.log('Server started!');
});
