var Catbox = require('catbox');
var CatboxMemory = require('catbox-memory');

var client = new Catbox.Client(CatboxMemory, { partition: 'default' });

var getDate = function (next) {

    next(new Date().toString());
};

client.start(function (err) {

    if (err) {
        throw err;
    }

    var options = {
        expiresIn: 2000,
        generateFunc: function (id, next) {

            if (id === 'getDate') {
                getDate(function (value) {

                    next(null, value);
                })
            } else {
                next(new Error('Unknown key!'));
            }

        }
    };

    var policy = new Catbox.Policy(options, client, 'default');

    setInterval(function () {

        policy.get('getDate', function (err, value, cached, report) {

            if (err) {
                throw err;
            }

            console.log(value + (cached ? ' (cached)' : ''));
        });
    }, 1000);
});