var Confidence = require('confidence');
var Glue = require('glue');
var Manifest = require('./manifest');

var store = new Confidence.Store();
store.load(Manifest);
var manifest = store.get('/manifest', { env: process.env.NODE_ENV || 'development' });

var options = { relativeTo: __dirname };

Glue.compose(manifest, options, function (err, server){

    if (err) {
        throw err;
    }

    server.settings.app = server.settings.app || {};
    server.settings.app.store = store;

    server.start(function (err) {

        if (err) {
            throw err;
        }

        server.log('info', 'Started server');
    });
});
