var Hapi = require('hapi');

// Creating a Hapi server

var server = new Hapi.Server();
server.connection({port: 4000});

// Setting up routes

server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello World!');
    }
}, {
    method: 'GET',
    path: '/json',
    handler: function (request, reply) {
        reply({hello: 'World'});
    }
}]);

// Registering the Good plugin

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events:{ response: '*' }
        }]
    }
}, function (err) {

    if (err) {
        throw err;
    }

    // Starting the server

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

});