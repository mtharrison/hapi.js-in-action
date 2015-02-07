
var Wreck = require('wreck');

var API_BASE_URL = 'http://localhost:4000/api';

module.exports = [{
	method: 'GET',
	path: '/',
	handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes';

        Wreck.get(apiUrl, {json: true}, function (err, res, payload) {

            if (err) {
                throw err;
            }

            reply.view('index', {
                recipes: payload
            });
        });
 
	}
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function (request, reply) {

        var apiUrl = API_BASE_URL + '/recipes/' + request.params.id;

        Wreck.get(apiUrl, {json: true}, function (err, res, payload) {

            if (err) {
                throw err;
            }

            reply.view('single', {
                recipe: payload
            });
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