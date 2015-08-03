var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'POST',
    path: '/avg',
    handler: function (request, reply) {

        var values = request.payload.values;
        var sum = 0;

        for (var i = 0; i < values.length; i++) {
            sum += values[i];
        }

        var mean = sum / values.length;
        reply({ mean: mean });
    }
});

server.start(function () {

    console.log('Server started!');
});
