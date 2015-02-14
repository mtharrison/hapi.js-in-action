var WEB_BASE_URL = 'http://localhost:4000/';
var API_BASE_URL = 'http://localhost:4000/api';

module.exports = [{
	method: 'GET',
	path: '/',
	handler: function (request, reply) {

        var recipes = [{
            id: 1,
            name: 'Silicate soup',
            cuisine: 'Martian',
            stars: 100,
            serves: 1,
            prep_time: '2 hours',
            cooking_time: '12 minutes'
        },
        {
            id: 2,
            name: 'Methane trifle',
            cuisine: 'Neptunian',
            stars: 200,
            serves: 1,
            prep_time: '1 hours',
            cooking_time: '24 minutes'
        }];
		
		reply.view('index', {
            recipes: recipes
        });
	}
},{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
}];