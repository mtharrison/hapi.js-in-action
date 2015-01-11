var Hapi = require('hapi');
var recipes = require('./recipes');

var server = new Hapi.Server();
server.connection({port: 4000});

server.method('search', function (query, next) {

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

server.method('retrieve', function (params, next) {

    var recipe;
    var id = parseInt(params.id);

    if ((id - 1) in recipes) {
        recipe = recipes[id - 1];
    } 
    
    next(null, recipe);

}, {});

server.route(require('./routes'));

server.start(function () {
    console.log('Server listening at:', server.info.uri);
});