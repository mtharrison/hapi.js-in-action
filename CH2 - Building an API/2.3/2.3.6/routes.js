module.exports = function (connection) {

    return [{
        method: 'GET',
        path: '/recipes',
        handler: function (request, reply) {

            var sql = 'SELECT * FROM recipes';
            var params = [];

            if (request.query.cuisine) {
                sql += ' WHERE cuisine = ?';
                params.push(request.query.cuisine);
            }

            connection.query(sql, params, function (err, results) {

                if (err) {
                    throw err;
                }

                reply(results);
            });
        }
    }, {
        method: 'GET',
        path: '/recipes/{id}',
        handler: function (request, reply) {
            
            connection.query('SELECT * FROM recipes WHERE id = ?', [request.params.id], function (err, results) {

                if (err) {
                    throw err;
                }

                if (results[0]) {
                    reply(results[0]);
                } else {
                    reply('Not found').code(404);
                }
            });
        }
    }];

};