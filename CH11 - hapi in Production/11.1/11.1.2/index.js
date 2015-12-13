const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        request.log(['route'], 'Someone requested the GET / route');
        reply('Howdy!');
    }
});

server.register({
    register: require('good'),
    options: {
        reporters: [
            {
                reporter: require('good-console'),
                events: { log:'*', request: '*', response: '*' }
            }
        ]
    }
}, err => {

    if (err) {
        throw err;
    }
    server.start(err => {

        if (err) {
            throw err;
        }
        server.log(['server'], 'Wohoo, the server has started!');
    });
});
