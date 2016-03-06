'use strict';

const Confidence = require('confidence');
const Glue = require('glue');

const manifest = new Confidence.Store(require('./config')).get('/', {
    env: process.env.NODE_ENV
});

const options = { relativeTo: __dirname };

Glue.compose(manifest, options, (err, server) => {

    setInterval(() => {

        const views = server.plugins['pingoo-portal'].viewCount();
        console.log('homepage has been viewed %d times', views);
    }, 1000);

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
