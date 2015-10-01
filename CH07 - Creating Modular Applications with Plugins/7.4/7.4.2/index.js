var Confidence = require('confidence');
var Glue = require('glue');
var Hoek = require('hoek');

var manifest = new Confidence.Store(require('./config')).get('/', {
    env: process.env.NODE_ENV
});

var options = { relativeTo: __dirname };

Glue.compose(manifest, options, function (err, server) {

    setInterval(function () {

        var views = server.plugins['pingoo-portal'].viewCount();
        console.log('homepage has been viewed %d times', views);
    }, 1000);

    Hoek.assert(!err, err);
    server.start(function (err) {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
});
