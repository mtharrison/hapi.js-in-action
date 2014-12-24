var Hapi = require('hapi');
var server = new Hapi.Server(4000);
var recipes = require('./recipes');

server.route({
    method: 'GET',
    path: '/recipes/{id}',
    handler: function(request, reply) {

        var id = request.params.id;

        if (recipes.hasOwnProperty(id)) {
            reply(recipes[id]);
        } else {
            reply("Recipe not found").code(404);
        }

    }
});

server.start(function() {
    console.log('Server listening at:', server.info.uri);
});