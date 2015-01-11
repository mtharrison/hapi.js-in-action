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

        var id = parseInt(request.params.id);

        if ((id - 1) in recipes) {
            reply(recipes[id - 1]);
        } else {
            reply("Recipe not found").code(404);
        }
    }
}];