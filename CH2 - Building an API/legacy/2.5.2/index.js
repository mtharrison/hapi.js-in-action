var Hapi = require('hapi');
var server = new Hapi.Server(4000);
var recipes = require('./recipes');

server.method('search', function(query, next) {
    var results = [];

    if (query.cuisine) {
        for(var i = 0; i < recipes.length; i++) {
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

server.route({
    method: 'GET',
    path: '/recipes',
    handler: function(request, reply) {
        server.methods.search(request.query, function(err, results){
            reply(results);
        });
    }
});

server.start(function() {
    console.log('Server listening at:', server.info.uri);
});