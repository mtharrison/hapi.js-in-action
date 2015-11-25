// Write a script like this to load
// your server object and start it
// listening on ports

var Server = require('./index');

Server(function (err, server) {

    if (err) {
        throw err;
    }

    server.start(function (err) {

        if (err) {
            throw err;
        }
        console.log('Server started!');
    });
});
