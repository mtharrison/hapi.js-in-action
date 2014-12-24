var Hapi = require('hapi');
var server = new Hapi.Server(4000);
var recipes = require('./recipes');

server.route({
    method: 'GET',
    path: '/recipes',
    handler: function(request, reply) {

        var results = [];

        if (request.query.cuisine) {
            for(var i = 0; i < recipes.length; i++) {
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
});

server.start(function() {
    console.log('Server listening at:', server.info.uri);
});