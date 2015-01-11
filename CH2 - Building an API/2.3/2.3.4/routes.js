var recipes = require('./recipes');

module.exports = [{
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

        var id = parseInt(request.params.id);

        if ((id - 1) in recipes) {
            reply(recipes[id - 1]);
        } else {
            reply("Recipe not found").code(404);
        }
    }
}];