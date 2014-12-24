var fs = require('fs');

fs.readFile('hapi.txt', function(err, data){
	if(err) throw err;

	console.log(data);
});