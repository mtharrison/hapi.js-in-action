'use strict';

const R = require('rethinkdb');

exports.register = function (server, options, next) {

    server.method({
        name: 'database.getRecent',
        method: function (callback) {

            R
            .table(options.dbTable)
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
            .table(options.dbTable)
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
            .table(options.dbTable)
            .insert(payload)
            .run(server.app.db, (err) => {

                if (err) {
                    throw err;
                }

                callback();
            });
        }
    });

    R.connect({ db: options.dbName }, (err, conn) => {

        if (err) {
            return next(err);
        }

        server.app.db = conn;
        next();
    });
};

exports.register.attributes = {
    pkg: require('./package')
};
