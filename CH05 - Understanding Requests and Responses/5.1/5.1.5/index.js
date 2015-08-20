var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        var tail1 = request.tail('Did DB activity');
        var tail2 = request.tail('Did Filesystem activity');

        setInterval(tail1, 1000);

        setInterval(tail2, 5000);

        reply('You\'ve been replied to');
    }
});

server.on('tail', function (request) {

    console.log('All activity concluded for request', request.id);
});

server.start(function () {

    console.log('Started server');
});
