'use strict';

const Glue = require('glue');
const Hoek = require('hoek');
const Manifest = require('./config');

const options = { relativeTo: __dirname };

Glue.compose(Manifest, options, (err, server) => {

    Hoek.assert(!err, err);
    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
});
