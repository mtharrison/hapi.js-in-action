var Hapi = require('hapi');
var ChildProcess = require('child_process');

var server = new Hapi.Server();
server.connection({ port: 80 });

server.start(function (err) {

    if (err) {
        throw err;
    }

    process.setgid(20);
    process.setuid(501);

    var evil = ChildProcess.spawn('touch', ['/var/log/nasty.log']);

    evil.stdout.pipe(process.stdout);
    evil.stderr.pipe(process.stdout);

    console.log('Started server!');
});
