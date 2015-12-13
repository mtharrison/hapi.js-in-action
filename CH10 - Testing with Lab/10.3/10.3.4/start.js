'use strict';

// Write a script like this to load
// your server object and start it
// listening on ports

const Server = require('./index');

Server((err, server) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server started!');
    });
});
