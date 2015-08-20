var Hapi = require('hapi');
var Wreck = require('wreck');

var server = new Hapi.Server();

server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/video',
    handler: function (request, reply) {

        Wreck.request('GET',
        'https://archive.org/download/isforAto1953/isforAto1953_512kb.mp4',
        { redirects: 3 },
        function (err, response) {

            if (err) {
                throw err;
            }

            var resp = reply(response);

            var sent = 0;
            resp.on('peek', function (chunk) {

                sent += chunk.length;
                process.stdout.write(sent + ' bytes written to response \r');
            });
        });
    }
});

server.start(function () {

    console.log('Server running at:', server.info.uri);
});
