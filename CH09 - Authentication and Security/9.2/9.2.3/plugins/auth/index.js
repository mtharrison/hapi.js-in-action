'use strict';

exports.register = function (server, options, next) {

    server.dependency(['bell', 'hapi-auth-cookie'], (server, next) => {

        server.auth.strategy('facebook', 'bell', options.bell);
        server.auth.strategy('session', 'cookie', options.cookies);

        server.route({
            method: ['POST', 'GET'],
            path: '/login',
            config: {
                auth: 'facebook'
            },
            handler: function (request, reply) {

                if (request.auth.isAuthenticated) {
                    const credentials = request.auth.credentials;
                    request.cookieAuth.set({ account: credentials });
                }

                return reply.redirect('/');
            }
        });

        server.route({
            method: 'GET',
            path: '/logout',
            config: {
                auth: 'session'
            },
            handler: function (request, reply) {

                request.cookieAuth.clear();
                reply.redirect('/');
            }
        });


        next();
    });

    next();
};

exports.register.attributes = {
    name: 'auth'
};
