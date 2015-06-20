var Catbox = require('catbox');
var CatboxMemory = require('catbox-memory');

var client = new Catbox.Client(CatboxMemory);

var CACHE_KEY = { id: 'getValue', segment: 'default' };
var TTL = 2000;

var getValue = function (callback) {

    client.get(CACHE_KEY, function (err, cached) {

        if (err) {
            throw err;
        }

        if (cached) {
            return callback(cached.item);
        }

        var value = Math.floor(Math.random() * 100);

        client.set(CACHE_KEY, value, TTL, function (err) {

            if (err) {
                throw err;
            }

            callback(value);
        });
    });
};

client.start(function () {

    setInterval(function () {

        getValue(function (value) {

            console.log(value);
        });
    }, 1000);
});
