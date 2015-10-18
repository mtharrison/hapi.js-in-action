var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 4000 });

var db = {};

server.register([
    { register: require('./plugins/web'), options: {
        db: db
    } },
    { register: require('./plugins/auth'), options: {
        db: db,
        bell: {
            provider: 'facebook',
            isSecure: false,
            password: 'MP1EDg609f6ouaSX',
            clientId: '107527619605244',
            clientSecret: '0aefbe3d28fd94cf5e00fee8e27d97ed'
        },
        cookies: {
            password: 'TfxNkk8cjAUIxw9p',
            cookie: 'wallpaper-session',
            isSecure: false
        }
    } },
    { register: require('vision') },
    { register: require('bell') },
    { register: require('hapi-auth-cookie') }
], function (err) {

    if (err) {
        throw err;
    }

    server.start(function () {

        console.log('Started server');
    });
});
