var Hapi = require('hapi');
var Sqlite3 = require('sqlite3');

var db = new Sqlite3.Database('../../dindin.sqlite');

var server = new Hapi.Server();
server.connection({port: 4000});

server.bind({db: db});

var validateFunc = function (token, callback) {

    db.get('SELECT * FROM users WHERE token = ?', [token], function (err, result) {

        if (err) {
            return callback(err, false);
        }

        var user = result;

        if (!user) {
            return callback(null, false);
        }

        callback(null, true, { 
            id: user.id, 
            username: user.username 
        });

    });
};

server.register(require('hapi-auth-bearer-token'), function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('api', 'bearer-access-token', { 
        validateFunc: validateFunc
    });

    server.route(require('./routes'));

    server.start(function () {
        console.log('Server listening at:', server.info.uri);
    });
});