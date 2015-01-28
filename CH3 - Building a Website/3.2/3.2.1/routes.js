module.exports = [{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply.file('./index.html');
    }
}];