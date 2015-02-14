var Pages = require('./handlers/pages');
var Actions = require('./handlers/actions');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Pages.home
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: Pages.viewRecipe
}, {
    method: 'GET',
    path: '/create',
    handler: Pages.createRecipe
}, {
    method: 'GET',
    path: '/login',
    handler: Pages.login
}, {
    method: 'POST',
    path: '/login',
    config: {
        payload: {
            output: 'data'
        }
    },
    handler: Actions.login
}, {
    method: 'GET',
    path: '/logout',
    handler: Actions.logout
}, {
    method: 'POST',
    path: '/create',
    config: {
        payload: {
            output: 'data'
        }
    },
    handler: Actions.create
}, {
    method: 'GET',
    path: '/recipes/{id}/star',
    handler: Actions.star
}, {
    method: 'GET',
    path: '/{param*}',
    handler: Actions.serveStatic
}];