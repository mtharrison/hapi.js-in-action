var recipes = require('./recipes');

module.exports = [{
    method: 'GET',
    path: '/recipes',
    handler: function (request, reply) {
        request.server.methods.search(request.query, function(err, recipes){

            if (err) {
                throw err;
            }

            reply(recipes);
        });
    }
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function (request, reply) {
        request.server.methods.retrieve(request.params, function(err, recipe){

            if (err) {
                throw err;
            }
            
            if (recipe) {
                reply(recipe);
            } else {
                reply('Recipe not found').code(404);
            }
        });
    }
}];