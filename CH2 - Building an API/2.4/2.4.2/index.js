var Hapi = require('hapi');
var Mysql = require('mysql');
var Bcrypt = require('bcrypt');

var connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dindin'
});

var server = new Hapi.Server();
server.connection({port: 4000});

server.register(require('hapi-auth-basic'), function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('api', 'basic', { 
        validateFunc: function (username, password, callback) {

            connection.query('SELECT * FROM users WHERE username = ?', [username], function (err, results) {

                if (err) {
                    return callback(err, false);
                }

                if (results.length !== 1) {
                    return callback(null, false);                    
                }

                var user = results[0];

                Bcrypt.compare(password, user.password, function (err, isValid) {
                    callback(err, isValid, { 
                        id: user.id, 
                        username: user.username 
                    });
                });

            });
        }
    });

    server.route(require('./routes')(connection));

    server.start(function () {
        console.log('Server listening at:', server.info.uri);
    });
});