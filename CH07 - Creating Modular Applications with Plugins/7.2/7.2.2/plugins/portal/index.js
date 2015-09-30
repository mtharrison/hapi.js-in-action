exports.register = function (server, options, next) {

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

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            server.methods.database.getRecent(function (err, pings) {

                if (err) {
                    throw err;
                }

                reply.view('home', {
                    pings: pings
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
                    code: code
                });
            });
        }
    });

    next();
};

exports.register.attributes = require('./package');
