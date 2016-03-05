'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.register([
    require('vision'),
    require('hapi-auth-cookie'),
    require('crumb')
], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        layout: true,
        path: Path.join(__dirname, 'views'),
        isCached: false
    });

    server.auth.strategy('session', 'cookie', {
        password: '7d1428970228c4c2286a0fd6438e393a',
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

                const message = request.auth.isAuthenticated ?
                    request.auth.credentials.message :
                    'Feeling great!';
                request.cookieAuth.set({ message: message });
                reply.view('index', { message: message });
            }
        }
    }, {
        method: 'POST',
        path: '/change',
        config: {
            auth: 'session',
            handler: function (request, reply) {

                request.cookieAuth.set({ message: request.payload.message });
                reply.redirect('/');
            }
        }
    }, {
        method: 'GET',
        path: '/evil',
        handler: {
            view: 'evil'
        }
    }]);

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
