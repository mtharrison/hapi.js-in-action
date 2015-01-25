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

            reply.view('index', {
                recipes: payload,
                user: request.session.get('user'),
                search: request.query.cuisine
            });
        });
    }
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes/' + request.params.id;

        Wreck.get(apiUrl, {json: true}, function (err, res, payload) {

            reply.view('single', {
                recipe: payload,
                user: request.session.get('user')
            });
        });
    }
}, {
    method: 'GET',
    path: '/create',
    handler: function (request, reply) {

        reply.view('create', {
            user: request.session.get('user')
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
    path: '/logout',
    handler: function (request, reply) {

        request.session.clear('user');
        reply.redirect(WEB_BASE_URL);
    }
}, {
    method: 'POST',
    path: '/login',
    config: {
        payload: {
            output: 'data',
            parse: true
        },
    },
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/login';

        Wreck.post(apiUrl, {
            payload: JSON.stringify(request.payload),
            json: true
        }, function (err, res, payload) {

            if (err) {
                throw err;
            }

            if (res.statusCode !== 200) {
                reply.redirect(WEB_BASE_URL + '/login');
            } else {
                request.session.set('user', {
                    loggedIn: true, 
                    token: payload.token
                });
                reply.redirect(WEB_BASE_URL);
            }

        });

    }
}, {
    method: 'POST',
    path: '/create',
    config: {
        payload: {
            output: 'data'
        },
    },
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes';

        Wreck.post(apiUrl, {
            payload: JSON.stringify(request.payload),
            headers: {
                'Authorization': 'Bearer ' + request.session.get('user').token
            }
        }, function (err, res, payload) {

            reply.redirect(WEB_BASE_URL);
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