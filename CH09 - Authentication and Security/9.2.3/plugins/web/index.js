var Handlebars = require('handlebars');
var Path = require('path');

exports.register = function (server, options, next) {

    var db = options.db;

    server.dependency(['vision', 'auth'], function (server, next) {

        server.views({
            engines: {
                hbs: Handlebars
            },
            path: Path.join(__dirname, 'views'),
            layout: true,
            isCached: process.env.NODE_ENV === 'production'
        });

        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: {
                    strategy: 'session',
                    mode: 'try'
                }
            },
            handler: function (request, reply) {

                var context = {};

                if (request.auth.isAuthenticated) {
                    var id = request.auth.credentials.id;
                    var account = db[id];
                    context = {
                        name: account.name,
                        wallpaper: account.wallpaper
                    };
                }

                reply.view('index', context);
            }
        });

        server.route({
            method: 'POST',
            path: '/wallpaper',
            config: {
                auth: 'session'
            },
            handler: function (request, reply) {

                var id = request.auth.credentials.id;
                db[id].wallpaper = request.payload.image;
                reply.redirect('/');
            }
        });

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'web'
};
