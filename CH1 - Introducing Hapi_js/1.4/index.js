var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 4000});

server.route([{
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Hello World!');
    }
}, {
    method: 'GET',
    path: '/json',
    handler: function(request, reply) {
        reply({hello: 'World'});
    }
}]);

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ response: '*' }]
        }]
    }
}, function (err) {

    if (err) {
        console.log(err);
        return;
    } 

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

});