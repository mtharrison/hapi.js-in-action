var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.register([
    require('vision'),
    require('hapi-auth-cookie'),
    require('crumb')
], function (err) {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        layout: true,
        path: Path.join(__dirname, 'views'),
        isCached: false
    });

    server.auth.strategy('session', 'cookie', {
        password: 'a51bq0LqVQRqM5y4',
        cookie: 'sid',
        isSecure: false
    });

    server.route([{
        method: 'GET',
        path: '/',
        config: {
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            handler: function (request, reply) {

                var message;

                if (!request.auth.isAuthenticated) {
                    message = 'Feeling great!';
                    request.auth.session.set({ message: message });
                } else {
                    message = request.auth.credentials.message;
                }

                reply.view('index', { message: message });
            }
        }
    }, {
        method: 'POST',
        path: '/change',
        config: {
            auth: 'session',
            handler: function (request, reply) {

                if (request.auth.isAuthenticated) {
                    var message = request.payload.message;
                    request.auth.session.set({ message: message });
                }
                reply.redirect('/');
            }
        }
    }, {
        method: 'GET',
        path: '/evil',
        handler: function (request, reply) {

            reply.view('evil');
        }
    }]);

    server.start(function (err) {

        console.log('Started server!');
    });
});
