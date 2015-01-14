var Hapi = require('hapi');
var Mysql = require('mysql');

var connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dindin'
});

var server = new Hapi.Server();
server.connection({port: 4000});

server.route(require('./routes')(connection));

server.start(function () {
    console.log('Server listening at:', server.info.uri);
});