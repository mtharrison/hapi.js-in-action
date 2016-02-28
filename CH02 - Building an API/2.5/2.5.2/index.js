'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');

const db = new Sqlite3.Database('../../dindin.sqlite');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.bind({ db: db });

const validateFunc = function (token, callback) {

    db.get('SELECT * FROM users WHERE token = ?', [token], (err, result) => {

        if (err) {
            return callback(err, false);
        }

        const user = result;

        if (!user) {
            return callback(null, false);
        }

        callback(null, true, {
            id: user.id,
            username: user.username
        });
    });
};

server.register(require('hapi-auth-bearer-token'), (err) => {

    if (err) {
        throw err;
    }

    server.auth.strategy('api', 'bearer-access-token', {
        validateFunc: validateFunc
    });

    server.route(require('./routes'));

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server listening at:', server.info.uri);
    });
});
