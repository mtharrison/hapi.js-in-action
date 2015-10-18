exports.register = function (server, options, next) {

    var db = options.db;

    server.dependency(['bell', 'hapi-auth-cookie'], function (server, next) {

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
                    var credentials = request.auth.credentials;
                    request.auth.session.set({ account: credentials });
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

                request.auth.session.clear();
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
