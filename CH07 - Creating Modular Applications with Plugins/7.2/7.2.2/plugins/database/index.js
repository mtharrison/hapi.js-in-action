var R = require('rethinkdb');

exports.register = function (server, options, next) {

    var conn;

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

    R.connect({ db: 'pingoo' }, function (err, connection) {

        if (err) {
            return next(err);
        }

        conn = connection;
        next();
    });
};

exports.register.attributes = require('./package');
