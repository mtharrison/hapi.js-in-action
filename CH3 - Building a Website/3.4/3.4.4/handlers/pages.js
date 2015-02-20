var Wreck = require('wreck');

exports.home = function (request, reply) {

    var apiUrl = this.apiBaseUrl + '/recipes';

    Wreck.get(apiUrl, {json: true}, function (err, res, payload) {

        if (err) {
            throw err;
        }

        reply.view('index', {
            recipes: payload,
            user: request.session.get('user')
        });
    });
};

exports.viewRecipe = function (request, reply) {

    var apiUrl = this.apiBaseUrl + '/recipes/' + request.params.id;

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