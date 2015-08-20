var Glue = require('glue');

var options = { relativeTo: __dirname };

Glue.compose(require('./manifest'), options, function (err, server){

    if (err) {
        throw err;
    }

    server.start(function (err) {

        if (err) {
            throw err;
        }

        server.log('info', 'Started server');
    });
});
