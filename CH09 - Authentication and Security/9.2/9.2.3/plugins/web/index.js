'use strict';

const Path = require('path');

exports.register = function (server, options, next) {

    server.dependency(['vision', 'auth'], (server, next) => {

        server.views({
            engines: {
                hbs: require('handlebars')
            },
            path: Path.join(__dirname, 'views')
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

                let context = { loggedIn: false };

                if (request.auth.isAuthenticated) {
                    const account = request.auth.credentials.account;
                    context = {
                        loggedIn: true,
                        name: account.profile.displayName
                    };
                }

                reply.view('index', context);
            }
        });

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'web'
};
