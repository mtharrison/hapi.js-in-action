var Wreck = require('wreck');

exports.home = function (request, reply) {

    var apiUrl = this.API_BASE_URL + '/recipes';

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
};

exports.viewRecipe = function (request, reply) {

    var apiUrl = this.API_BASE_URL + '/recipes/' + request.params.id;

    Wreck.get(apiUrl, {json: true}, function (err, res, payload) {

        reply.view('single', {
            recipe: payload,
            user: request.session.get('user')
        });
    });
};

exports.createRecipe = function (request, reply) {

    reply.view('create', {
        user: request.session.get('user')
    });
};

exports.login = function (request, reply) {

    reply.view('login');
};