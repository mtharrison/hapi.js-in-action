'use strict';

const Recipes = require('./handlers/recipes');

module.exports = [{
    method: 'GET',
    path: '/api/recipes',
    handler: Recipes.find
}, {
    method: 'GET',
    path: '/api/recipes/{id}',
    handler: Recipes.findOne
}];
