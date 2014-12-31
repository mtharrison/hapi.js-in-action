var recipes = require('./recipes');

module.exports = [{
    method: 'GET',
    path: '/recipes',
    handler: function (request, reply) {
        reply(recipes);
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
}];