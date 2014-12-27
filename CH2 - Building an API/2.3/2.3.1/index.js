var Hapi = require('hapi');
var recipes = require('./recipes');

var server = new Hapi.Server();
server.connection({port: 4000});

server.route([{
    method: 'GET',
    path: '/recipes',
    handler: function(request, reply) {
        reply(recipes);
    }
}]);

server.start(function(){
    console.log('Server listening at:', server.info.uri);
});