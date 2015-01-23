var Hapi = require('hapi');
var Sqlite3 = require('sqlite3');
var Bcrypt = require('bcrypt');

var db = new Sqlite3.Database('../../dindin.sqlite');

var server = new Hapi.Server();
server.connection({port: 4000});

server.bind({db: db});

var validate = function (username, password, callback) {

    db.get('SELECT * FROM users WHERE username = ?', [username], function (err, result) {

        if (err) {
            return callback(err, false);
        }

        var user = result;

        if (!user) {
            return callback(null, false);                    
        }

        Bcrypt.compare(password, user.password, function (err, isValid) {
            callback(err, isValid, { 
                id: user.id, 
                username: user.username 
            });
        });

    });
};

server.register(require('hapi-auth-basic'), function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('api', 'basic', { validateFunc: validate });

    server.route(require('./routes'));

    server.start(function () {
        console.log('Server listening at:', server.info.uri);
    });
});