var recipes = require('./recipes');

module.exports = [{
    method: 'GET',
    path: '/recipes',
    handler: function (request, reply) {
        reply(recipes);
    }
}];