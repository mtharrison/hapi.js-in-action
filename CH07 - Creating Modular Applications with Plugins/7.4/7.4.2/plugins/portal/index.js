var after = function (server, next) {

    var appName = server.settings.app.appName;

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        helpersPath: 'templates/helpers',
        partialsPath: 'templates/partials',
        path: 'templates',
        layout: true,
        isCached: false
    });

    var counter = 0;
    server.expose('viewCount', function () {

        return counter;
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            counter++;

            server.methods.database.getRecent(function (err, pings) {

                if (err) {
                    throw err;
                }

                reply.view('home', {
                    pings: pings,
                    appName: appName
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/flight/{code}',
        handler: function (request, reply) {

            var code = request.params.code;

            server.methods.database.getFlight(code, function (err, pings) {

                if (err) {
                    throw err;
                }

                reply.view('flight', {
                    pings: pings,
                    code: code,
                    appName: appName
                });
            });
        }
    });

    next();
};

exports.register = function (server, options, next) {

    server.dependency(['pingoo-database', 'vision'], after);
    next();
};

exports.register.attributes = require('./package');
