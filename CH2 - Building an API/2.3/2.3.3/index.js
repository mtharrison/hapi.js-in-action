var Hapi = require('hapi');
var recipes = require('./recipes');

var server = new Hapi.Server();
server.connection({port: 4000});

server.method('search', function(query, next) {
    var results = [];

    if (query.cuisine) {
        for(var i in recipes) {
            var recipe = recipes[i];

            if (recipe.cuisine === query.cuisine) {
                results.push(recipe);
            }
        }
    } else {
        results = recipes;
    }

    next(null, results);

}, {});

server.route([{
    method: 'GET',
    path: '/recipes',
    handler: function(request, reply) {
        server.methods.search(request.query, function(err, results){
            reply(results);
        });
    }
}, {
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
}]);

server.start(function(){
    console.log('Server listening at:', server.info.uri);
});