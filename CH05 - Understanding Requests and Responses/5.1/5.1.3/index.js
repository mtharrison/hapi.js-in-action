var Boom = require('boom');
var Hapi = require('hapi');
var Netmask = require('netmask').Netmask;

var blacklist = [
    '12.166.96.32/27',
    '41.58.0.0/16',
    '41.66.192.0/18',
    '127.0.0.0/8'           // comment this line out for access
];

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.ext('onRequest', function (request, reply) {

    var ip = request.info.remoteAddress;

    for (var i = 0; i < blacklist.length; i++) {
        var block = new Netmask(blacklist[i]);

        if (block.contains(ip)) {
            console.log('Blocking request from ' + ip + '. Within blocked subnet ' + blacklist[i]);
            return reply(Boom.forbidden());
        }
    }

    reply.continue();
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('Greetings, you were allowed in.');
    }
});

server.start(function () {

    console.log('Started server');
});
