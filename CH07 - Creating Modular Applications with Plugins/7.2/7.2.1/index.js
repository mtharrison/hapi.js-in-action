var Hapi = require('hapi');
var Hoek = require('hoek');
var R = require('rethinkdb');

var server = new Hapi.Server({
    debug: {
        request: ['error'],
        log: ['error']
    }
});

server.connection({ port: 4000 });

server.register(require('vision'), function (err) {

    var setup = function (err, conn) {

        Hoek.assert(!err, err);

        // Database

        server.method({
            name: 'database.getRecent',
            method: function (callback) {

                R
                .table('pings')
                .orderBy(R.desc('timestamp'))
                .run(conn, function (err, cursor) {

                    if (err) {
                        throw err;
                    }

                    cursor.toArray(callback);
                });
            }
        });

        server.method({
            name: 'database.getFlight',
            method: function (code, callback) {

                R
                .table('pings')
                .filter({ code: code })
                .orderBy(R.desc('timestamp'))
                .run(conn, function (err, cursor) {

                    if (err) {
                        throw err;
                    }

                    cursor.toArray(callback);
                });
            }
        });

        server.method({
            name: 'database.addPing',
            method: function (payload, callback) {

                R
                .table('pings')
                .insert(payload)
                .run(conn, function (err) {

                    if (err) {
                        throw err;
                    }

                    callback();
                });
            }
        });

        // Portal

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

        Hoek.assert(!err, err);
        server.start(function (err) {

            Hoek.assert(!err, err);
            console.log('Server started at: ' + server.info.uri);
        });
    };

    R.connect({ db: 'pingoo' }, setup);
});
