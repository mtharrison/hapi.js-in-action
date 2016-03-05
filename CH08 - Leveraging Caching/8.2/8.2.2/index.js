'use strict';

const Catbox = require('catbox');
const CatboxMemory = require('catbox-memory');
const Wreck = require('wreck');

const search = function (id, next) {

    const baseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch';
    const apiKey = process.env.NYT_ARTICLE_API_KEY || 'YOUR_API_KEY';
    const query = 'Node.js';

    const url = baseUrl + '.json?q=' + query + '&api-key=' + apiKey;

    Wreck.get(url, { json: true }, (err, res, payload) => {

        if (err) {
            return next(err, null);
        }

        const numArticles = payload.response.meta.hits;
        next(err, numArticles);
    });
};

const loop = function () {

    const startTime = Date.now();

    policy.get('node.js', (err, value, cached, report) => {

        if (err) {
            throw err;
        }

        const endTime = Date.now() - startTime;
        console.log('Found %d articles in %dms %s', value, endTime, cached ? '(CACHED)' : '');
    });

};

const client = new Catbox.Client(CatboxMemory);

const options = {
    expiresIn: 2000,
    generateFunc: search,
    generateTimeout: false
};

const policy = new Catbox.Policy(options, client, 'default');

client.start((err) => {

    if (err) {
        throw err;
    }

    setInterval(loop, 2000);
});
