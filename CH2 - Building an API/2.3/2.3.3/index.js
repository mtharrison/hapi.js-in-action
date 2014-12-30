var Hapi = require('hapi');
var recipes = require('./recipes');

var server = new Hapi.Server();
server.connection({port: 4000});

server.route([{
    method: 'GET',
    path: '/recipes',
    handler: function (request, reply) {

        var results = [];

        if (request.query.cuisine) {
            for(var i in recipes) {
                var recipe = recipes[i];

                if (recipe.cuisine === request.query.cuisine) {
                    results.push(recipe);
                }
            }
        } else {
            results = recipes;
        }

        reply(results);

    }
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function (request, reply) {

        var id = request.params.id;

        if (recipes.hasOwnProperty(id)) {
            reply(recipes[id]);
        } else {
            reply("Recipe not found").code(404);
        }
    }
}]);

server.start(function () {
    console.log('Server listening at:', server.info.uri);
});