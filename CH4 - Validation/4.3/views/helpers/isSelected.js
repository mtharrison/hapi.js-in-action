var Handlebars = require('handlebars');

module.exports = function(real, check) {
    if(real === check)
    	return 'selected';

    return '';
};