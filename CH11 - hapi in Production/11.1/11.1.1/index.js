const Hapi = require('hapi');

const server = new Hapi.Server({
    debug: {
        log: ['server'],
        request: ['route', 'handler']
    }
});
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        request.log(['route'], 'Someone requested the GET / route');
        reply('Howdy!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    server.log(['server'], 'Wohoo, the server has started!');
});
