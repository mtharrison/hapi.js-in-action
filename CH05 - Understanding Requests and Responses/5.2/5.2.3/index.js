'use strict';

const Hapi = require('hapi');
const Wreck = require('wreck');

const server = new Hapi.Server();

server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/video',
    handler: function (request, reply) {

        Wreck.request('GET',
        'https://archive.org/download/isforAto1953/isforAto1953_512kb.mp4',
        { redirects: 3 },
        (err, response) => {

            if (err) {
                throw err;
            }

            const resp = reply(response);             // response is an instanceof ReadableStream

            let sent = 0;
            resp.on('peek', (chunk) => {      // resp has a 'peek' event for each chunk written

                sent += chunk.length;
                process.stdout.write(sent + ' bytes written to response \r');
            });
        });
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
