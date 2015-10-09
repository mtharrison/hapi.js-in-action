var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 4000});

server.register([
    { register: require('vision') },
    { register: require('bell') },
    { register: require('hapi-auth-cookie') }
], function (err) {

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        path: Path.join(__dirname, 'views'),
        layout: true,
        isCached: false
    });

    server.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        isSecure: false,
        password: 'MP1EDg609f6ouaSX',
        clientId: '107527619605244',
        clientSecret: '0aefbe3d28fd94cf5e00fee8e27d97ed'
    });

    server.auth.strategy('session', 'cookie', {
        password: 'TfxNkk8cjAUIxw9p',
        cookie: 'wallpaper-session',
        isSecure: false
    });

    server.route([{
        method: 'GET',
        path: '/',
        config: {
            auth: {
                strategy: 'session',
                mode: 'try'
            }
        },
        handler: function (request, reply) {

            var context;

            if (request.auth.isAuthenticated) {
                var account = request.auth.credentials;
                context = {
                    loggedIn: true,
                    name: account.name,
                    wallpaper: account.wallpaper
                };
            }

            reply.view('index', context);
        }
    }, {
        method: ['POST', 'GET'],
        path: '/login',
        config: {
            auth: 'facebook'
        },
        handler: function (request, reply) {

            // If facebook worked, set their info in the session

            if (request.auth.isAuthenticated) {
                var credentials = request.auth.credentials;

                // Create an account object to represent user

                var account = {
                    email: credentials.profile.email,
                    id: credentials.profile.id,
                    name: credentials.profile.displayName,
                    wallpaper: null
                };

                // Save their ID in the cookie session, so we can 
                // retrieve it later in other routes

                request.auth.session.set(account);
            }

            return reply.redirect('/');
        }
    }, {
        method: 'GET',
        path: '/logout',
        config: {
            auth: 'session'
        },
        handler: function (request, reply) {

            request.auth.session.clear();
            reply.redirect('/');
        }
    }, {
        method: 'POST',
        path: '/wallpaper',
        config: {
            auth: 'session'
        },
        handler: function (request, reply) {

            var account = request.auth.credentials;
            account.wallpaper = request.payload.image;
            request.auth.session.set(account);

            reply.redirect('/');
        }
    }]);

    if(err) {
        throw err;
    }
    
    server.start(function () {
        console.log('Started server');
    });
});