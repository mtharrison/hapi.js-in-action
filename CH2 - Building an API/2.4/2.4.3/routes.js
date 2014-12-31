module.exports = [{
    method: 'GET',
    path: '/recipes',
    handler: function (request, reply) {
        
        request.server.methods.search(request.query.cuisine, function (err, results) {

            if (err) {
                throw err;
            }

            reply(results);
        });
    }
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function (request, reply) {

        request.server.methods.retrieve(request.params.id, function (err, recipe) {

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
}]