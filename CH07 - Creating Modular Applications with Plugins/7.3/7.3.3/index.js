var Glue = require('glue');
var Hoek = require('hoek');
var Manifest = require('./config');

var options = { relativeTo: __dirname };

Glue.compose(Manifest, options, function (err, server) {

    Hoek.assert(!err, err);
    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
});
