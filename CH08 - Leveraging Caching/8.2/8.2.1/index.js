'use strict';

const Wreck = require('wreck');

const search = function (id, next) {

    const baseUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch';
    const apiKey = '6e4deaad56fa6f8bbb47dcc4fa700ba6:5:72077307';
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

    search('node.js', (err, value) => {

        if (err) {
            throw err;
        }

        const endTime = Date.now() - startTime;
        console.log('Found %d articles in %dms', value, endTime);
    });
};

setInterval(loop, 2000);
