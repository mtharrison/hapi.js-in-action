var Wreck = require('wreck');

var WEB_BASE_URL = 'http://localhost:4000';
var API_BASE_URL = 'http://localhost:4000/api';

module.exports = [{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        
        var apiUrl = API_BASE_URL + '/recipes';

        if (request.query.cuisine) {
            apiUrl += '?cuisine=' + request.query.cuisine;
        }

        Wreck.get(apiUrl, {json: true}, function (err, res, payload) {
            reply.view('index', {recipes: payload});
        });
    }
}, {
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {
        reply.view('login');
    }
}, {
    method: 'GET',
    path: '/create',
    handler: function (request, reply) {
        reply.view('create');
    }
}, {
    method: 'POST',
    path: '/create',
    config: {
        payload: {
            output: 'data',
            parse: false
        },
    },
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes';

        Wreck.post(apiUrl, {
            payload: request.payload
        }, function (err, res, payload) {
            debugger;
            reply.redirect(WEB_BASE_URL);
        });
    }
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes/' + request.params.id;

        Wreck.get(apiUrl, {json: true}, function (err, res, payload) {
            reply.view('single', {recipe: payload});
        });
    }
}, {
    method: 'GET',
    path: '/recipes/{id}/star',
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes/' + request.params.id + '/star';

        Wreck.post(apiUrl, function (err, res, payload) {
            reply.redirect(WEB_BASE_URL + '/recipes/' + request.params.id);
        });
    }
}, {
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
}];