module.exports = function (errors, field) {
	
	if(errors && errors.hasOwnProperty(field)) 
		return 'has-error';

	return '';
};