var Hapi = require('hapi');
var Wreck = require('wreck');
var Path = require('path');

var server = new Hapi.Server();
server.connection({port: 4000});

server.register(require('dindin-api'),
    function (err) {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, 'views')
    });

    server.route([{
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            Wreck.get('http://localhost:4000/api/recipes', {json: true}, function (err, res, payload) {
                reply.view('index', {recipes: payload});
            });
        }
    }, {
        method: 'GET',
        path: '/recipes/{id}',
        handler: function (request, reply) {
            Wreck.get('http://localhost:4000/api/recipes/' + request.params.id, function (err, res, payload) {
                reply.view('single', {recipe: payload});
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
    }]);

    server.start(function () {
        console.log('Started server at', server.info.uri);
    });
});