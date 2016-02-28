'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');

const db = new Sqlite3.Database('../../dindin.sqlite');

const server = new Hapi.Server();
server.connection({ port: 4000 });

server.bind({ db: db });

server.route(require('./routes'));

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server listening at:', server.info.uri);
});
