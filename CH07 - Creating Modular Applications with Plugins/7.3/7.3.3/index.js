'use strict';

const Glue = require('glue');
const Manifest = require('./config');

const options = { relativeTo: __dirname };

Glue.compose(Manifest, options, (err, server) => {

    if (err) {
        throw err;
    }
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server started at: ' + server.info.uri);
    });
});
