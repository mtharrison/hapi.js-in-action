// Catflap is open   => 0dd31dde3980c1b7ecee12e0c52d85a5
// Ink is dry        => 65e11a21872da5477187bcdbfa1ef25f
// Bird has flown    => ef2de8d315317333f7930901287fa768

var Crypto = require('crypto');
var Hapi = require('hapi');
var Path = require('path');
var Fs = require('fs');

var server = new Hapi.Server();
server.connection({ port: 4000 });

server.method('readKey1', function (request, reply) {

    Fs.readFile('key1.txt', 'utf8', function (err, data) {

        if (err) {
            throw err;
        }

        reply(data);
    });
});

server.method('readKey2', function (request, reply) {

    Fs.readFile('key2.txt', 'utf8', function (err, data) {

        if (err) {
            throw err;
        }

        reply(data);
    });
});

server.method('decryptMessage', function (request, reply) {

    var decipher = Crypto.createDecipher('aes-256-cbc', request.pre.readKey1 + request.pre.readKey2);
    var cleartext = decipher.update(request.payload.message, 'hex', 'utf8');
    cleartext += decipher.final('utf8');

    reply(cleartext);
});

server.method('convertMessage', function (request, reply) {

    var messages = {
        'Catflap is open': 'I have infiltrated the base',
        'Ink is dry': 'I have the blueprints',
        'Bird has flown': 'I am making my escape'
    };

    reply(messages[request.pre.decryptMessage]);
});

server.route({
    method: 'POST',
    path: '/',
    handler: function (request, reply) {

        console.log(new Date() + ': Incoming payload');

        console.log('Encrypted message: ' + request.payload.message);
        console.log('Decrypted message: ' + request.pre.decryptMessage);
        console.log('Converted message: ' + request.pre.convertMessage);

        reply('ok');
    },
    config: {
        pre: [
            [
                'readKey1',
                'readKey2'
            ],
            'decryptMessage',
            'convertMessage'
        ]
    }
});

server.start(function () {

    console.log('Server started!');
});
