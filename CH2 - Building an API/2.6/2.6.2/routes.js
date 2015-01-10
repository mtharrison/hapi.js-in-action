module.exports = [{
    method: 'GET',
    path: '/recipes',
    config: {
        auth: 'api'
    },
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
}, {
    method: 'POST',
    path: '/recipes',
    config: {
        payload: {
            parse: true,
            output: 'data'
        }
    },
    handler: function (request, reply) {
        request.server.methods.create(request.payload, function (err, results){

            if(err) {
                throw err;
            }

            reply({status: 'ok'});
        });
    }
}, {
    method: 'POST',
    path: '/recipes/{id}/star',
    handler: function (request, reply) {
        request.server.methods.star(request.params.id, function (err, results){

            if(err) {
                throw err;
            }

            reply({status: 'ok'});
        });
    }
}];