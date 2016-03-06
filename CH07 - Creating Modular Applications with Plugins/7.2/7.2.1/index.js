'use strict';

const Hapi = require('hapi');
const R = require('rethinkdb');

const server = new Hapi.Server({
    debug: {
        request: ['error'],
        log: ['error']
    }
});

server.connection({ port: 4000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        server.methods.database.getRecent((err, pings) => {

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

        const code = request.params.code;

        server.methods.database.getFlight(code, (err, pings) => {

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

// Database

server.method({
    name: 'database.getRecent',
    method: function (callback) {

        R
        .table('pings')
        .orderBy(R.desc('timestamp'))
        .run(server.app.db, (err, cursor) => {

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
        .run(server.app.db, (err, cursor) => {

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
        .run(server.app.db, (err) => {

            if (err) {
                throw err;
            }

            callback();
        });
    }
});

server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

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

    R.connect({ db: 'pingoo' }, (err, conn) => {

        if (err) {
            throw err;
        }

        server.app.db = conn;

        server.start((err) => {

            if (err) {
                throw err;
            }
            console.log('Server started at: ' + server.info.uri);
        });
    });
});
